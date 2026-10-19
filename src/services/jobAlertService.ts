import { JobListing, JobAlertSubscription, JobAlertLog, NotificationItem } from '../types';

export interface MatchedJobResult {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  applyUrl: string;
  workMode: string;
  employmentType: string;
  matchScore: number;
  matchReason: string;
  postedDate: string;
}

export const jobAlertService = {
  // Matches available jobs against a user's subscription preferences
  matchJobs(jobs: JobListing[], sub: JobAlertSubscription): MatchedJobResult[] {
    const results: MatchedJobResult[] = [];

    const targetRoles = (sub.targetRoles || []).map((r) => r.toLowerCase().trim()).filter(Boolean);
    const locations = (sub.preferredLocations || []).map((l) => l.toLowerCase().trim()).filter(Boolean);
    const prefWorkMode = (sub.workMode || 'any').toLowerCase();
    const prefEmpType = (sub.employmentType || 'any').toLowerCase();

    for (const job of jobs) {
      let score = 50; // baseline
      const reasons: string[] = [];

      const jobTitle = job.title.toLowerCase();
      const jobDesc = (job.description || '').toLowerCase();
      const jobLoc = job.location.toLowerCase();
      const jobWorkMode = (job.workMode || '').toLowerCase();
      const jobEmpType = (job.employmentType || '').toLowerCase();

      // 1. Role Match
      let roleMatched = false;
      if (targetRoles.length === 0) {
        roleMatched = true;
        score += 20;
      } else {
        for (const role of targetRoles) {
          const roleKeywords = role.split(' ').filter((w) => w.length > 2);
          const hasFull = jobTitle.includes(role);
          const hasKeyword = roleKeywords.some((w) => jobTitle.includes(w) || jobDesc.includes(w));

          if (hasFull) {
            roleMatched = true;
            score += 35;
            reasons.push(`Exact role match: "${role}"`);
            break;
          } else if (hasKeyword) {
            roleMatched = true;
            score += 20;
            reasons.push(`Relevant skills for "${role}"`);
            break;
          }
        }
      }

      if (!roleMatched && targetRoles.length > 0) {
        continue; // Skip if no role relevancy
      }

      // 2. Location Match
      let locationMatched = false;
      if (locations.length === 0 || locations.includes('any') || locations.includes('all india')) {
        locationMatched = true;
        score += 15;
      } else {
        for (const loc of locations) {
          if (loc === 'remote' && (jobWorkMode.includes('remote') || jobLoc.includes('remote'))) {
            locationMatched = true;
            score += 20;
            reasons.push('Remote flexibility');
            break;
          } else if (jobLoc.includes(loc)) {
            locationMatched = true;
            score += 20;
            reasons.push(`Location in ${loc}`);
            break;
          }
        }
      }

      if (!locationMatched && locations.length > 0) {
        // If job is Remote, permit it even if user preferred specific city
        if (jobWorkMode.includes('remote') || jobLoc.includes('remote')) {
          locationMatched = true;
          score += 10;
          reasons.push('Remote option');
        } else {
          continue;
        }
      }

      // 3. Work Mode Match
      if (prefWorkMode !== 'any') {
        if (jobWorkMode.includes(prefWorkMode)) {
          score += 10;
        } else if (prefWorkMode === 'remote' && !jobWorkMode.includes('remote')) {
          continue;
        }
      }

      // 4. Employment Type Match
      if (prefEmpType !== 'any') {
        if (jobEmpType.includes(prefEmpType)) {
          score += 10;
        } else if (prefEmpType === 'internship' && !jobEmpType.includes('intern')) {
          continue;
        }
      }

      // 5. Fresher Friendly bonus
      if (job.isFresherFriendly) {
        score += 5;
      }

      const finalScore = Math.min(99, Math.max(70, score));

      results.push({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salaryText || 'Competitive Market CTC',
        applyUrl: job.applicationUrl || '#',
        workMode: job.workMode,
        employmentType: job.employmentType,
        matchScore: finalScore,
        matchReason: reasons.join(' • ') || 'Matched your profile preferences',
        postedDate: job.postedDate,
      });
    }

    // Sort by match score and then recency
    return results.sort((a, b) => b.matchScore - a.matchScore);
  },

  // Builds responsive HTML email template for daily digest
  generateEmailHtml(
    recipientName: string,
    recipientEmail: string,
    matches: MatchedJobResult[],
    subscription: JobAlertSubscription
  ): { subject: string; html: string } {
    const count = matches.length;
    const dateStr = new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const subject = `YouthPath Daily Job Digest: ${count} verified openings matching your preferences (${dateStr})`;

    const jobsHtml = matches
      .slice(0, 6)
      .map(
        (job) => `
      <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <span style="display: inline-block; background-color: #ecfdf5; color: #047857; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; margin-bottom: 6px;">
              ${job.matchScore}% Match
            </span>
            <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700; color: #0f172a;">${job.title}</h3>
            <p style="margin: 0; font-size: 13px; font-weight: 600; color: #0d9488;">${job.company}</p>
          </div>
        </div>

        <div style="margin: 10px 0; font-size: 12px; color: #475569; display: flex; flex-wrap: wrap; gap: 12px;">
          <span>📍 <strong>Location:</strong> ${job.location}</span>
          <span>💼 <strong>Mode:</strong> ${job.workMode}</span>
          <span>💰 <strong>Package:</strong> ${job.salary}</span>
        </div>

        <p style="margin: 8px 0 12px 0; font-size: 11px; color: #64748b; background-color: #f8fafc; padding: 6px 10px; border-radius: 6px;">
          🎯 <em>Why it matched: ${job.matchReason}</em>
        </p>

        <a href="${job.applyUrl}" target="_blank" style="display: inline-block; background-color: #0d9488; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 600; padding: 8px 16px; border-radius: 8px;">
          View & Apply Online →
        </a>
      </div>
    `
      )
      .join('');

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #1e293b;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Top Header Banner -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #134e4a 100%); padding: 28px 24px; color: #ffffff;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Youth<span style="color: #2dd4bf;">Path</span></span>
        <span style="background-color: rgba(45, 212, 191, 0.2); color: #2dd4bf; font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 12px; margin-left: 8px;">Daily Digest</span>
      </div>
      <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700;">Verified Job Alerts for ${recipientName || 'Student'}</h1>
      <p style="margin: 0; font-size: 13px; color: #99f6e4;">${dateStr} • Matching your saved career preferences</p>
    </div>

    <!-- Intro Card -->
    <div style="padding: 20px 24px 10px 24px;">
      <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.6; color: #334155;">
        Hello <strong>${recipientName || 'there'}</strong>,<br/>
        We scanned active recruiter postings and verified <strong>${count} new opportunities</strong> that match your criteria:
      </p>

      <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; padding: 10px 14px; border-radius: 0 8px 8px 0; margin-bottom: 20px; font-size: 12px; color: #475569;">
        <strong>Your Active Alert Preferences:</strong><br/>
        • <strong>Roles:</strong> ${(subscription.targetRoles || ['Any Role']).join(', ')}<br/>
        • <strong>Locations:</strong> ${(subscription.preferredLocations || ['All India / Remote']).join(', ')}<br/>
        • <strong>Work Mode:</strong> ${subscription.workMode.toUpperCase()} • <strong>Frequency:</strong> Daily
      </div>

      <!-- Job List -->
      <h2 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">
        Top Matches For You Today (${count})
      </h2>

      ${jobsHtml}

      ${
        matches.length > 6
          ? `<p style="text-align: center; font-size: 13px; color: #0d9488; font-weight: 600; margin: 16px 0;">+ ${
              matches.length - 6
            } more verified jobs available in your dashboard</p>`
          : ''
      }
    </div>

    <!-- Footer Actions -->
    <div style="background-color: #f8fafc; padding: 20px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; line-height: 1.6;">
      <p style="margin: 0 0 8px 0;">
        You received this email because you subscribed to daily job alerts on <strong>YouthPath</strong> for <em>${recipientEmail}</em>.
      </p>
      <p style="margin: 0;">
        To manage alert filters, change notification frequency, or pause emails, open the <strong>YouthPath Daily Job Alerts</strong> setting in your dashboard.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    return { subject, html };
  },
};

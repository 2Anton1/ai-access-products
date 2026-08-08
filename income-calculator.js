// AI Side Hustle Income Calculator
// External JS to bypass GitHub Pages CSP

const hustleData = {
    writing: { name: "AI Content Writing", baseRate: 50, maxRate: 200, unit: "per article" },
    images: { name: "AI Image Generation", baseRate: 25, maxRate: 150, unit: "per design" },
    social: { name: "AI Social Media Management", baseRate: 300, maxRate: 1000, unit: "per month per client" },
    products: { name: "Digital Products", baseRate: 10, maxRate: 50, unit: "per sale" },
    consulting: { name: "AI Consulting", baseRate: 100, maxRate: 300, unit: "per hour" },
    tutoring: { name: "AI Tutoring", baseRate: 20, maxRate: 50, unit: "per hour" },
    video: { name: "AI Video Editing", baseRate: 50, maxRate: 300, unit: "per project" },
    seo: { name: "AI SEO Services", baseRate: 200, maxRate: 1000, unit: "per month per client" }
};

const skillMultipliers = {
    beginner: 0.5,
    intermediate: 0.75,
    advanced: 1.0,
    expert: 1.3
};

const audienceMultipliers = {
    none: 0.6,
    small: 0.8,
    medium: 1.0,
    large: 1.4
};

function calculate() {
    const skill = document.getElementById('skill').value;
    const hours = parseInt(document.getElementById('hours').value);
    const hustle = document.getElementById('hustle').value;
    const audience = document.getElementById('audience').value;

    const data = hustleData[hustle];
    const skillMult = skillMultipliers[skill];
    const audienceMult = audienceMultipliers[audience];

    // Calculate weekly output (how many units per week)
    let unitsPerWeek;
    if (data.unit.includes('hour')) {
        unitsPerWeek = hours;
    } else if (data.unit.includes('month')) {
        unitsPerWeek = hours / 4; // monthly clients based on weekly hours
    } else {
        // For per-article, per-design, per-sale: estimate based on time
        unitsPerWeek = Math.max(1, Math.floor(hours / 2)); // ~2 hours per unit
    }

    // Calculate income
    const lowRate = data.baseRate * skillMult * audienceMult;
    const highRate = data.maxRate * skillMult * audienceMult;

    const weeklyLow = lowRate * unitsPerWeek;
    const weeklyHigh = highRate * unitsPerWeek;

    const monthlyLow = weeklyLow * 4;
    const monthlyHigh = weeklyHigh * 4;

    const yearlyLow = monthlyLow * 12;
    const yearlyHigh = monthlyHigh * 12;

    // Time to first dollar
    let timeToFirstDollar;
    if (skill === 'beginner' && audience === 'none') timeToFirstDollar = '2-4 weeks';
    else if (skill === 'beginner') timeToFirstDollar = '1-3 weeks';
    else if (audience === 'none') timeToFirstDollar = '1-2 weeks';
    else timeToFirstDollar = 'Within 1 week';

    // Difficulty
    const difficulty = {
        writing: 'Easy', images: 'Easy', tutoring: 'Easy',
        products: 'Medium', social: 'Medium', video: 'Medium',
        seo: 'Hard', consulting: 'Hard'
    };

    const resultsHtml = `
        <div class="stat">
            <span class="label">Side Hustle</span>
            <span class="value">${data.name}</span>
        </div>
        <div class="stat">
            <span class="label">Estimated Hourly Rate</span>
            <span class="value green">$${lowRate.toFixed(0)} - $${highRate.toFixed(0)}/hour</span>
        </div>
        <div class="stat">
            <span class="label">Weekly Income (conservative)</span>
            <span class="value">$${weeklyLow.toFixed(0)}/week</span>
        </div>
        <div class="stat">
            <span class="label">Weekly Income (optimistic)</span>
            <span class="value green">$${weeklyHigh.toFixed(0)}/week</span>
        </div>
        <div class="stat">
            <span class="label">Monthly Income Range</span>
            <span class="value yellow">$${monthlyLow.toFixed(0)} - $${monthlyHigh.toFixed(0)}/month</span>
        </div>
        <div class="stat">
            <span class="label">Yearly Income Potential</span>
            <span class="value green">$${yearlyLow.toFixed(0)} - $${yearlyHigh.toFixed(0)}/year</span>
        </div>
        <div class="stat">
            <span class="label">Time to First Dollar</span>
            <span class="value">${timeToFirstDollar}</span>
        </div>
        <div class="stat">
            <span class="label">Difficulty</span>
            <span class="value">${difficulty[hustle]}</span>
        </div>
        <div class="stat">
            <span class="label">Your Setup</span>
            <span class="value">${hours}h/week, ${skill} level</span>
        </div>
    `;

    document.getElementById('results').innerHTML = resultsHtml;
    document.getElementById('result').classList.add('show');

    // Scroll to results
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}

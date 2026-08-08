
        const prompts = {
            business: {
                template: `Act as a business strategist. Analyze this idea: {TASK}.
Break down:
1) Target market size and demographics
2) Revenue model options (at least 3)
3) Key competitors and their weaknesses
4) Biggest risks and how to mitigate them
5) First 3 action steps to get started
6) Estimated startup cost
7) Time to profitability

Tone: {TONE}
Audience: {AUDIENCE}

Be specific with numbers and examples. Avoid generic advice.`,
                context: "business strategy analysis"
            },
            marketing: {
                template: `Act as a marketing expert. Create a marketing plan for: {TASK}.

Include:
1) 5 attention-grabbing headlines/hooks
2) Target audience analysis: {AUDIENCE}
3) 3 marketing channels with rationale
4) Content calendar (first 2 weeks)
5) Key metrics to track
6) Budget allocation suggestions
7) Competitor analysis (3 competitors)

Tone: {TONE}

Make it actionable, not theoretical. Give specific examples.`,
                context: "marketing strategy"
            },
            content: {
                template: `Write {TASK}.

Requirements:
- Target audience: {AUDIENCE}
- Tone: {TONE}
- Structure: Clear introduction, 3-5 main sections with H2 headers, actionable takeaways, strong conclusion
- Include specific examples and data points
- Avoid generic phrases like "in today's fast-paced world"
- Add a call-to-action at the end

Word count: Appropriate for the topic (not padded).`,
                context: "content creation"
            },
            productivity: {
                template: `Act as a productivity coach. Help me with: {TASK}.

My situation:
- Target audience/role: {AUDIENCE}
- Preferred tone: {TONE}

Create a practical, step-by-step system that I can implement today. Include:
1) Time-blocking schedule
2) Priority framework (Eisenhower Matrix)
3) Distraction elimination plan
4) Daily/weekly review template
5) 3 habits to start this week

Make it specific to my situation, not generic advice.`,
                context: "productivity system"
            },
            career: {
                template: `Act as a career coach. Help me with: {TASK}.

My background: {AUDIENCE}
Tone: {TONE}

Include:
1) Specific, actionable steps
2) Common mistakes to avoid
3) Scripts/templates I can use immediately
4) Timeline and milestones
5) How to measure success

Make it practical and specific to my situation.`,
                context: "career development"
            },
            learning: {
                template: `Act as a learning expert. I want to learn: {TASK}.

My level: {AUDIENCE} (beginner/intermediate/advanced)
Preferred style: {TONE}

Create a learning plan:
1) Prerequisites I need
2) Core concepts in learning order
3) Best free resources for each concept
4) A mini-project for each phase
5) Self-assessment questions
6) 7-day quick-start plan

Make it practical and immediately actionable.`,
                context: "learning plan"
            },
            writing: {
                template: `Act as an expert editor and writing coach.

Task: {TASK}
Target audience: {AUDIENCE}
Tone: {TONE}

1) Improve clarity, conciseness, and impact
2) Fix any grammar or style issues
3) Make every sentence earn its place
4) Keep the original voice but make it punchier
5) Flag any vague language or unsupported claims
6) Provide the improved version with annotations

Also suggest 3 alternative openings.`,
                context: "writing improvement"
            },
            email: {
                template: `Act as an email communication expert.

Write an email for: {TASK}
Recipient: {AUDIENCE}
Tone: {TONE}

Requirements:
- Subject line that gets opened (under 50 characters)
- Opening line that's NOT "I hope this finds you well"
- Clear, single purpose
- Under 150 words total
- Specific call-to-action
- Professional but human tone

Also provide 2 alternative subject lines.`,
                context: "email writing"
            },
            meeting: {
                template: `Act as a meeting facilitator and note-taker.

Here are my raw meeting notes: {TASK}
Meeting type: {AUDIENCE}
Tone: {TONE}

Organize into:
1) Meeting summary (3 sentences max)
2) Key decisions made
3) Action items (with owners and due dates)
4) Open questions
5) Topics for next meeting
6) Follow-up email draft

Make it clear and scannable.`,
                context: "meeting notes"
            },
            decision: {
                template: `Act as a decision-making consultant.

Decision needed: {TASK}
Context: {AUDIENCE}
Tone: {TONE}

Help me decide:
1) Frame the decision clearly
2) List all options (at least 3)
3) Create a weighted decision matrix (7 criteria)
4) Identify risks for each option
5) Recommend the best option with rationale
6) Suggest a test before full commitment

Be objective and data-driven.`,
                context: "decision making"
            }
        };

        function generatePrompt() {
            const category = document.getElementById('category').value;
            const task = document.getElementById('task').value.trim();
            const audience = document.getElementById('audience').value.trim() || 'General audience';
            const tone = document.getElementById('tone').value || 'Professional';

            if (!category) { alert('Please choose a category'); return; }
            if (!task) { alert('Please describe your task'); return; }

            const p = prompts[category];
            let prompt = p.template
                .replace('{TASK}', task)
                .replace('{AUDIENCE}', audience)
                .replace('{TONE}', tone);

            document.getElementById('promptOutput').textContent = prompt;
            document.getElementById('result').classList.add('show');
        }

        function copyPrompt() {
            const text = document.getElementById('promptOutput').textContent;
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.querySelector('.copy-btn');
                btn.textContent = 'Copied!';
                setTimeout(() => btn.textContent = 'Copy to Clipboard', 2000);
            });
        }
    
🎥 Demo

<video src="[PASTE_YOUR_GITHUB_UPLOAD_LINK_HERE](https://github.com/user-attachments/assets/c8952f14-16e4-438c-bd96-a01d4112caad)" width="100%" controls autoplay loop muted>
  Your browser does not support the video tag.
</video>


🎯 The Problem
TikTok's "For You" feed is designed for endless scrolling, but this creates a major issue for users watching news or educational content: upload dates are completely hidden. Without knowing the upload date, it is impossible to tell if a news video is from today or three years ago, making it dangerously easy to consume outdated or misleading information.

💡 The Solution
TikTok Date Reveal is a lightweight Chrome Extension that extracts the hidden upload timestamp from a TikTok video and displays it directly on the screen as a non-intrusive overlay. It shows the exact date, time, and the age of the video (e.g., "2 days ago" or "5 months ago") for 6 seconds, then fades away so you can keep scrolling.

🧠 How I Built This (AI Orchestration)
This project was built using AI-Assisted Development, where I acted as the Product Manager and AI Orchestrator, and Qwen AI acted as my development team.

Iterative Prompt Engineering: I used structured, multi-turn prompts to guide Qwen AI through generating the JavaScript logic, DOM manipulation, and CSS styling required for the extension.
Overcoming Security Constraints: During development, I hit a hard block: TikTok and Chrome's security models strictly restrict automated access to internal video metadata (CORS & API limitations). Automated scraping of the date was impossible.
The Architectural Pivot: Instead of giving up, I redesigned the workflow. I implemented a clipboard-parsing workaround:
The user right-clicks the video and copies the link.
The user clicks the extension icon.
The extension grabs the URL from the Windows clipboard, parses the hidden timestamp out of the URL string, calculates the age, and triggers the UI overlay.
This pivot bypassed the API restrictions entirely while maintaining a seamless, 2-click user experience.

🛠️ Tech Stack
Language: JavaScript (AI-generated & iteratively refined)
Platform: Chrome Extensions API (Manifest V3)
UI: DOM Manipulation & CSS Overlay
AI Engine: Qwen AI (Prompt Engineering & Code Generation)
Data Parsing: Clipboard API & URL Timestamp extraction

⚙️ How to Install (For Local Testing)
Download or clone this repository to your local machine.
Open Google Chrome and navigate to chrome://extensions/.
Enable Developer mode (toggle in the top right).
Click "Load unpacked" and select the folder containing the extension files.
Navigate to TikTok, right-click a video, copy the link, and click the extension icon to see the upload date!

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url || !tab.url.includes('tiktok.com')) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: 'MAIN',
      func: async () => {
        // 1. Create or find the overlay (Added line-height and text-align for 2 lines)
        let ov = document.getElementById('tt-date-ext');
        if (!ov) {
          ov = document.createElement('div');
          ov.id = 'tt-date-ext';
          ov.style.cssText = 'position:fixed!important;top:80px!important;right:20px!important;background:rgba(0,0,0,0.9)!important;color:#00f2ea!important;padding:14px 18px!important;border-radius:12px!important;z-index:2147483647!important;pointer-events:none!important;font:600 15px sans-serif!important;border:1px solid #00f2ea!important;transition:opacity 0.5s;line-height:1.5!important;text-align:left!important;';
          document.body.appendChild(ov);
        }
        
        ov.style.opacity = '1';
        ov.innerHTML = '📅 Reading Clipboard...';

        try {
          const text = await navigator.clipboard.readText();
          const match = text.match(/\/video\/(\d{15,20})/) || text.match(/\/@[\w.-]+\/video\/(\d{15,20})/);
          
          if (match) {
            const id = match[1];
            const ts = Number(BigInt(id) >> 32n);
            
            if (ts > 1262304000 && ts < 2051222400) {
              const dateObj = new Date(ts * 1000);
              
              // Format Line 1: "Monday, August 24, 2026, 12:00:00 PM"
              const dateStr = dateObj.toLocaleDateString('en-US', { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
              });
              const timeStr = dateObj.toLocaleTimeString('en-US', { 
                hour: '2-digit', minute: '2-digit', second: '2-digit' 
              });
              const line1 = `📅 ${dateStr}, ${timeStr}`;

              // Calculate Line 2: Relative Time (Years, Months, Days)
              const now = new Date();
              let years = now.getFullYear() - dateObj.getFullYear();
              let months = now.getMonth() - dateObj.getMonth();
              let days = now.getDate() - dateObj.getDate();

              if (days < 0) {
                months--;
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += prevMonth.getDate();
              }
              if (months < 0) {
                years--;
                months += 12;
              }

              let parts = [];
              if (years > 0) parts.push(years + (years === 1 ? ' year' : ' years'));
              if (months > 0) parts.push(months + (months === 1 ? ' month' : ' months'));
              if (days > 0 || parts.length === 0) parts.push(days + (days === 1 ? ' day' : ' days'));

              let relativeStr = '';
              if (parts.length === 1) relativeStr = parts[0];
              else if (parts.length === 2) relativeStr = parts[0] + ' and ' + parts[1];
              else relativeStr = parts[0] + ', ' + parts[1] + ' and ' + parts[2];

              const line2 = `⏳ Uploaded: ${relativeStr} ago`;

              // Display both lines
              ov.innerHTML = line1 + '<br>' + line2;
            } else {
              ov.innerHTML = '⚠️ Invalid Date in Link';
            }
          } else {
            ov.innerHTML = '⚠️ No TikTok Link in Clipboard';
          }
        } catch (err) {
          ov.innerHTML = '❌ Clipboard Access Denied';
        }

        // Auto-hide after 8 seconds (gave it 2 extra seconds since it's 2 lines)
        setTimeout(() => { ov.style.opacity = '0'; }, 8000);
      }
    });
  } catch (e) {
    console.error("Injection failed:", e);
  }
});
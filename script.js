  const avatarUpload = document.getElementById("avatarUpload");
  const avatar = document.getElementById("avatar");
  const roleList = document.getElementById("roleList");
  const roleDropdown = document.getElementById("roleDropdown");
  const materiSelect = document.getElementById("materiSelect");
  const xInput = document.getElementById("xInput");
  const nameInput = document.getElementById("nameInput");
  const textColor = document.getElementById("textColor");
  const textBgColor = document.getElementById("textBgColor");
  const textArea = document.getElementById("textArea");
  const overlayDecor = document.getElementById("overlayDecor");
  const bgLayer = document.getElementById("bgLayer");
  const preview = document.getElementById("preview");
  const materiTitle = document.getElementById("materi-title");
  const materiDesc = document.getElementById("materi-desc");

  const randomBackgrounds = ["assets/bg1.jpg","assets/bg2.jpg","assets/bg3.jpg","assets/bg4.jpg","assets/bg5.jpg","assets/bg6.jpg","assets/bg7.jpg"];
  const decorImages = ["assets/decor1.png","assets/decor2.png","assets/decor3.png","assets/decor4.png","assets/decor5.png","assets/decor6.png","assets/decor7.png","assets/decor8.png","assets/decor9.png","assets/decor10.png"];

avatarUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('avatar').src = e.target.result;
  };
  reader.readAsDataURL(file);
});

    // === Tambahan: Data Materi ===
  const materiData = {
    "Tutorial": { 
      title: "How To Use RialOshare Generator",
      content: `
        <ul>
          <li> Select the material to display on the banner.</li>
          <li> Enter your nickname X for the profile.</li>
          <li> Upload an avatar/profile image from your device.</li>
          <li> Choose a role (optional) to show on the banner.</li>
          <li> Click 'Generate Banner' to create the banner with a random background and top-layer decoration.</li>
          <li> Download the created banner using the 'Download' button.</li>
          <li> Share the banner to X (Twitter) using the 'Share to X' button.</li>
        </ul>
      `
    },
    
    "What is Rialo?": {
      title: "What Is Rialo?",
      content: `
        <h3>Rialo is more than just a typical Layer 1 blockchain. It is a full-stack system that integrates web calls, oracles, scheduling, and native stable gas.</h3>
        <h3>This allows developers to build responsive applications that connect directly to real-world data without needing additional middleware.</h3>
      `
    },

    "RWA Rialo": {
      title: "RWA Rialo",
      content: `
        <ol>
          <li><strong>Direct data connectivity:</strong> Assets are directly linked to real-world data and react automatically.</li>
          <li><strong>Automation & on-chain reactivity:</strong> Smart contracts adjust prices, payments, and terms in real time.</li>
          <li><strong>Privacy & real identity:</strong> Supports real-world identities with built-in privacy protection.</li>
          <li><strong>Speed & scalability:</strong> Sub-second reactions capable of handling large-scale performance.</li>
        </ol>
        <p><strong>Rialo makes Real-World Assets come alive on-chain — connected, automated, and responsive.</strong></p>
      `
    },

    "Rialo Isn't Layer One": {
      title: "Rialo Isn't Layer One",
      content: `
        <h3><strong>No plugins. No patchwork.</strong> Rialo unifies what used to be fragmented into a single, full-stack system, so apps can launch faster and run smoother like the products people expect.</h3>
        <h3>Web calls, smart triggers, cross-chain flows — it’s all native. <strong>Build Less, Build More.</strong></h3>
      `
    },

    "This Is Just Beginning": {
      title: "This Is Just Beginning",
      content: `
        <p>Subzero Labs believes the future of Web3 is AI-native, where users can earn passive income through AI agents and build custom AI workflows on-chain without complex prompt engineering. 
        Rialo makes this possible, with SCALE as the first step toward that vision. Developers and creators are invited to collaborate in building the future of Rialo + AI.
        <img src="assets/img/subzeroxrialo.png" alt="AI Future"></p>
      `
    },

    "Rialo Role System": {
      title: "Rialo Role System",
      content: `
        <img src="assets/img/roles.jpg" alt="Role System">
      `
    }
  };

  // === Change material ===
  materiSelect.addEventListener("change", () => {
    const selected = materiSelect.value;
    const materi = materiData[selected];
    if (materi) {
      materiTitle.textContent = materi.title;
      materiDesc.innerHTML = materi.content;
    }
  });


  document.getElementById("generateBtn").addEventListener("click", () => {
    roleList.innerHTML = "";
    const checked = roleDropdown.querySelectorAll("input:checked");
    checked.forEach(cb => {
      const div = document.createElement("div");
      div.classList.add("role-badge");
      div.innerHTML = `<img src="assets/icons/${cb.value}.png"><span>${cb.parentElement.querySelector("span").textContent}</span>`;
      roleList.appendChild(div);
    });

    document.getElementById("materi-title").textContent = materiSelect.value;
    document.getElementById("socialHandle").textContent = xInput.value || "@RialoNetwork";
    document.getElementById("userName").textContent = nameInput.value || "Username";
    textArea.style.color = textColor.value;
    textArea.style.background = textBgColor.value + "cc";

    bgLayer.innerHTML = "";
    const bg = document.createElement("img");
    bg.src = randomBackgrounds[Math.floor(Math.random() * randomBackgrounds.length)];
    Object.assign(bg.style, {width:"100%",height:"100%",objectFit:"cover",opacity:"0.9"});
    bgLayer.appendChild(bg);

    overlayDecor.innerHTML = "";
    const decor = document.createElement("img");
    decor.src = decorImages[Math.floor(Math.random() * decorImages.length)];
    Object.assign(decor.style,{position:"absolute",width:"100%",height:"100%",objectFit:"cover",opacity:"0.8"});
    overlayDecor.appendChild(decor);
  });

  // --- DOWNLOAD FUNCTION ---
  document.getElementById("downloadBtn").addEventListener("click", async () => {
    const canvas = await html2canvas(preview, { backgroundColor: null, scale: 2 });
    const link = document.createElement("a");
    link.download = "RialOshare.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  // --- SHARE TO X FUNCTION ---
  document.getElementById("shareBtn").addEventListener("click", async () => {
    const canvas = await html2canvas(preview, { backgroundColor: null, scale: 2 });
    const image = canvas.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const file = new File([blob], "RialO-Card.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        text: "✨ My RialO Threads Created with #RialOshare",
        files: [file],
      });
    } else {
      const tweetText = encodeURIComponent("✨ My RialO Card Created with #RialOshare");
      window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank");
    }
  });

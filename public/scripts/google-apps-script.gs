// Google Apps Script - Drive'daki fotoğrafları JSON'a yazıyor
// 1. Google Drive klasöründe klasörleri kategori adı yapın
// 2. Her klasöre fotoğrafları koyun
// 3. Bu script'i Apps Script'te çalıştırın
// 4. GitHub token'ı authorize edin

const GITHUB_REPO = "YOUR_GITHUB_USERNAME/atlcelikyapi"; // Değiştir
const GITHUB_BRANCH = "main";
const GITHUB_TOKEN = PropertiesService.getUserProperties().getProperty('GITHUB_TOKEN');
const DRIVE_FOLDER_ID = "YOUR_DRIVE_FOLDER_ID"; // Değiştir

function slugify(text) {
  if (!text) return "diger";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getGalleryData() {
  const galleryData = {};
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const categories = folder.getFolders();
  
  while (categories.hasNext()) {
    const categoryFolder = categories.next();
    const categoryName = categoryFolder.getName();
    const categorySlug = slugify(categoryName);
    
    galleryData[categorySlug] = [];
    
    const files = categoryFolder.getFiles();
    while (files.hasNext()) {
      const file = files.next();
      if (file.getMimeType().indexOf("image") !== -1) {
        const fileId = file.getId();
        galleryData[categorySlug].push({
          src: `https://drive.google.com/uc?id=${fileId}`,
          title: file.getName().replace(/\.[^.]+$/, ""),
          alt: `ATL Çelik Yapı - ${categoryName}`
        });
      }
    }
  }
  
  return galleryData;
}

function updateGitHubJSON(filename, data) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filename}`;
  const content = Utilities.base64Encode(JSON.stringify(data, null, 2));
  
  const options = {
    method: "put",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json"
    },
    payload: JSON.stringify({
      message: `Auto-update: ${filename}`,
      content: content,
      branch: GITHUB_BRANCH
    })
  };
  
  try {
    UrlFetchApp.fetch(url, options);
    Logger.log(`✓ ${filename} updated successfully`);
  } catch (error) {
    Logger.log(`✗ Error updating ${filename}: ${error}`);
  }
}

function runSync() {
  const galleryData = getGalleryData();
  updateGitHubJSON("public/data/galeri.json", galleryData);
}

// Google Drive tabanlı ATL Çelik Yapı İçerik Sistemi
// Folder yapısı: ATLYonetim/ATL_GALERI/{kategori} ve ATLYonetim/IsOrtaklari
// Bu script Google Apps Script editöründe çalıştırılır

const GITHUB_REPO = "YOUR_USERNAME/atlcelikyapi";
const GITHUB_BRANCH = "main";
const GITHUB_TOKEN = PropertiesService.getUserProperties().getProperty('GITHUB_TOKEN');

// ROOT: ATLYonetim klasörüne sahip Drive'da
// Folder ID'sini Google Drive URL'sinden al: https://drive.google.com/drive/folders/{FOLDER_ID}
const ROOT_FOLDER_ID = PropertiesService.getUserProperties().getProperty('ROOT_FOLDER_ID') || "PASTE_ROOT_FOLDER_ID_HERE";

function setupAuth() {
  PropertiesService.getUserProperties().setProperty('GITHUB_TOKEN', 'YOUR_GITHUB_TOKEN_HERE');
  PropertiesService.getUserProperties().setProperty('ROOT_FOLDER_ID', 'YOUR_ATLLYONETIM_FOLDER_ID_HERE');
  Logger.log('Auth setup complete - check properties');
}

function getGalleryData() {
  const galleryData = {};
  const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
  const galeriFolder = rootFolder.getFoldersByName('ATL_GALERI').next();
  
  const categoryFolders = galeriFolder.getFolders();
  while (categoryFolders.hasNext()) {
    const categoryFolder = categoryFolders.next();
    const categoryName = categoryFolder.getName(); // celik-yapi, merdiven, etc.
    
    galleryData[categoryName] = [];
    
    const imageFiles = categoryFolder.getFilesByType(MimeType.JPEG)
      .concat(categoryFolder.getFilesByType(MimeType.PNG))
      .concat(categoryFolder.getFilesByType('image/webp'));
    
    let fileArray = [];
    while (imageFiles.hasNext()) {
      fileArray.push(imageFiles.next());
    }
    
    fileArray.forEach((file) => {
      const fileId = file.getId();
      galleryData[categoryName].push({
        src: `https://drive.google.com/uc?id=${fileId}&export=download`,
        title: file.getName().replace(/\.[^.]+$/, ""),
        alt: `ATL Çelik Yapı - ${categoryName}`
      });
    });
  }
  
  return galleryData;
}

function getPartnersData() {
  const partnersData = { partners: [] };
  const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
  const partnersFolder = rootFolder.getFoldersByName('IsOrtaklari').next();
  
  const logoFiles = partnersFolder.getFiles();
  let index = 1;
  
  while (logoFiles.hasNext()) {
    const file = logoFiles.next();
    const fileId = file.getId();
    
    partnersData.partners.push({
      id: index,
      name: file.getName().replace(/\.[^.]+$/, ""),
      logo: `https://drive.google.com/uc?id=${fileId}&export=download`,
      website: ""
    });
    
    index++;
  }
  
  return partnersData;
}

function updateGitHub(filename, data) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filename}`;
  const content = Utilities.base64Encode(JSON.stringify(data, null, 2));
  
  const options = {
    method: "put",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json"
    },
    muteHttpExceptions: true,
    payload: JSON.stringify({
      message: `Auto-sync: ${filename} from Google Drive`,
      content: content,
      branch: GITHUB_BRANCH
    })
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());
  
  if (response.getResponseCode() === 200 || response.getResponseCode() === 201) {
    Logger.log(`✓ ${filename} updated`);
    return true;
  } else {
    Logger.log(`✗ Error: ${result.message}`);
    return false;
  }
}

function syncAll() {
  Logger.log('Starting sync...');
  
  const galleryData = getGalleryData();
  const partnersData = getPartnersData();
  
  updateGitHub('public/data/galeri.json', galleryData);
  updateGitHub('public/data/partners.json', partnersData);
  
  Logger.log('Sync complete!');
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('ATL Sync')
    .addItem('Setup Auth', 'setupAuth')
    .addItem('Sync Now', 'syncAll')
    .addToUi();
}

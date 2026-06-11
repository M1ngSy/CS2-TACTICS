const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpegPath = require('ffmpeg-static');

const videosDir = path.join(__dirname, '..', 'public', 'videos');

function findFiles(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(findFiles(filePath, ext));
    } else if (file.endsWith(ext)) {
      results.push(filePath);
    }
  }
  return results;
}

const videos = findFiles(videosDir, '.mp4');
console.log(`找到 ${videos.length} 个视频文件`);

let totalBefore = 0;
let totalAfter = 0;

for (const video of videos) {
  const before = fs.statSync(video).size;
  totalBefore += before;
  const tempFile = video.replace('.mp4', '_temp.mp4');

  console.log(`压缩: ${path.basename(path.dirname(video))}/${path.basename(video)} (${(before / 1024 / 1024).toFixed(1)}MB)`);

  try {
    execSync(
      `"${ffmpegPath}" -i "${video}" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 64k -y "${tempFile}"`,
      { stdio: 'pipe' }
    );
    const after = fs.statSync(tempFile).size;
    totalAfter += after;
    fs.renameSync(tempFile, video);
    console.log(`  -> ${(after / 1024 / 1024).toFixed(1)}MB (节省 ${((1 - after / before) * 100).toFixed(0)}%)`);
  } catch (e) {
    console.error(`  ❌ 失败: ${e.message}`);
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  }
}

console.log(`\n总计: ${(totalBefore / 1024 / 1024).toFixed(0)}MB -> ${(totalAfter / 1024 / 1024).toFixed(0)}MB (节省 ${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
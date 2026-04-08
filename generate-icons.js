const fs = require('fs');
const { createCanvas } = require('canvas');

// 아이콘 생성 함수
function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // 배경색
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, size, size);

  // 그라디언트
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#6366f1');
  gradient.addColorStop(1, '#06b6d4');

  // 원형 배경
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
  ctx.fill();

  // 텍스트 "김"
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.5}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('김', size / 2, size / 2);

  return canvas.toBuffer('image/png');
}

// 아이콘 생성 및 저장
console.log('🎨 아이콘 생성 중...');

try {
  const icon192 = generateIcon(192);
  fs.writeFileSync('icon-192x192.png', icon192);
  console.log('✅ icon-192x192.png 생성 완료');

  const icon512 = generateIcon(512);
  fs.writeFileSync('icon-512x512.png', icon512);
  console.log('✅ icon-512x512.png 생성 완료');

  console.log('\n💡 사용 방법:');
  console.log('npm install canvas');
  console.log('node generate-icons.js');
} catch (error) {
  console.error('❌ 오류:', error.message);
  console.log('\n📝 대체 방법: 온라인 아이콘 생성기 사용');
  console.log('https://www.favicon-generator.org/');
}

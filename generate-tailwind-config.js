const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'img');
const imgFiles = fs.readdirSync(imgDir);

const bgImages = imgFiles.reduce((acc, file) => {
  const fileName = path.parse(file).name;
  acc[fileName] = `url('/public/img/${file}')`;
  return acc;
}, {});

const config = `
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      backgroundImage: ${JSON.stringify(bgImages, null, 2)}
    },
    corePlugins: {
      aspectRatio: false,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
`;

fs.writeFileSync('tailwind.config.js', config, 'utf-8');
console.log('Tailwind config file generated successfully.');

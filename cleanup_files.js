const fs = require('fs');
const path = require('path');

const filesToDelete = [
    'hooks/useMousePosition.ts',
    'hooks/useScrollAnimation.ts',
    'components/sections/CooperationHeader.tsx',
    'components/ui/Badge.tsx',
    'components/ui/Button.tsx',
    'components/ui/Input.tsx',
    'scripts/raw-insert-admin.js',
    'prisma/seed-admin.js',
    'prisma/seed-admin.ts',
    'SUPABASE_SETUP.md'
];

filesToDelete.forEach(file => {
    const fullPath = path.join('d:/GlobalCooperation', file);
    try {
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log(`Deleted: ${file}`);
        } else {
            console.log(`File not found, skipping: ${file}`);
        }
    } catch (err) {
        console.error(`Error deleting ${file}: ${err.message}`);
    }
});

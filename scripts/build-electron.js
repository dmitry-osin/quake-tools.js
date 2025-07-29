const { build } = require('esbuild')
const path = require('path')

async function buildElectron() {
    try {
        // Build main process
        await build({
            entryPoints: ['src/electron/app.ts'],
            bundle: true,
            platform: 'node',
            target: 'node22',
            outfile: 'dist/electron/app.js',
            external: ['electron'],
            format: 'cjs',
            sourcemap: true,
            minify: process.env.NODE_ENV === 'production'
        })

        // Build preload script
        await build({
            entryPoints: ['src/electron/preload.ts'],
            bundle: true,
            platform: 'node',
            target: 'node22',
            outfile: 'dist/electron/preload.js',
            external: ['electron'],
            format: 'cjs',
            sourcemap: true,
            minify: process.env.NODE_ENV === 'production'
        })

        console.log('✅ Electron build completed')
    } catch (error) {
        console.error('❌ Electron build error:', error)
        process.exit(1)
    }
}

buildElectron() 
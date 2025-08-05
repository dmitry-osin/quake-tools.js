const { build, context } = require('esbuild')
const path = require('path')

async function buildElectron() {
    try {
        // Build main process
        await build({
            entryPoints: ['src/electron/application.ts'],
            bundle: true,
            platform: 'node',
            target: 'node22',
            outfile: 'dist/electron/application.js',
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

async function watchElectron() {
    try {
        // Build main process with watch
        const mainContext = await context({
            entryPoints: ['src/electron/application.ts'],
            bundle: true,
            platform: 'node',
            target: 'node22',
            outfile: 'dist/electron/application.js',
            external: ['electron'],
            format: 'cjs',
            sourcemap: true,
            minify: process.env.NODE_ENV === 'production'
        })

        // Build preload script with watch
        const preloadContext = await context({
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

        await mainContext.watch()
        await preloadContext.watch()

        console.log('🔍 Watching Electron files for changes...')
    } catch (error) {
        console.error('❌ Electron watch error:', error)
        process.exit(1)
    }
}

// Check if watch mode is requested
if (process.argv.includes('--watch')) {
    watchElectron()
} else {
    buildElectron()
} 
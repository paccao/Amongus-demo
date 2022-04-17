#!/usr/bin/env node

import { stat } from 'fs/promises'

const fileExists = async (path) => Boolean(await stat(path).catch((e) => false))

const ensureCertificatesExist = async (requiredFiles) => {
	const results = await Promise.all(requiredFiles.map(fileExists))
	const missingFiles = results.reduce(
		(missing, res, i) => (res ? missing : [...missing, requiredFiles[i]]),
		[],
	)

	if (missingFiles.length) {
		console.error('[local-coordinator]: Missing files', missingFiles)
		console.error(
			'\n[local-coordinator]: Generate certificates for localhost and place them in the root of the project. More info: https://github.com/hathora/local-coordinator#readme',
		)
		process.exit(1)
	}
}

await ensureCertificatesExist(['./localhost.pem', './localhost-key.pem'])

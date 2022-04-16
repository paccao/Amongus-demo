#!/usr/bin/env node

import { stat } from 'fs/promises'

const fileExists = async (path) => Boolean(await stat(path).catch((e) => false))

const ensureCertificatesExist = async (requiredCertificatePaths) => {
	const result = await Promise.all(requiredCertificatePaths.map(fileExists))

	if (result.some((r) => r === false)) {
		console.error(
			'Error: Generate certificates for localhost and place them in the root of the project. More info: https://github.com/hathora/local-coordinator#readme',
		)
		process.exit(1)
	}
}

await ensureCertificatesExist(['localhost.pem', 'localhost-key.pem'])

// initiate the

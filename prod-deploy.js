const buildTag = process.argv[2]
const shell = require('shelljs')

shell.exec(`docker build  -t hipbar/superadmin:${buildTag} . && docker push hipbar/superadmin:${buildTag}`)

const buildTag = process.argv[2]
const shell = require('shelljs')

if (!buildTag) {
  const err = new Error('Build tag is missing')
  throw err
} else {
  shell.exec(`docker build  -t hipbar/superadmin:${buildTag} . && docker push hipbar/superadmin:${buildTag}`)
}

const { execSync } = require('child_process');
try {
  execSync('npm run db:seed', { stdio: 'pipe' });
} catch (e) {
  require('fs').writeFileSync('seed_error2.txt', (e.stderr ? e.stderr.toString() : "") + "\nSTDOUT:\n" + (e.stdout ? e.stdout.toString() : ""));
}

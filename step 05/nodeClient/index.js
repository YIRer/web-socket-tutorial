const os = require("os");
function performance() {
  return new Promise(async (rsv, rej) => {
    const osType = os.type() === "Darwin" ? "Mac" : os.type();
    const uptime = os.uptime();
    const freeMeme = os.freemem();
    const totalMeme = os.totalmem();
    const usedMeme = totalMeme - freeMeme;
    const memeUseage = Math.floor((usedMeme / totalMeme) * 100) / 100;
    const cpus = os.cpus();
    const numOfCpus = cpus.length;
    const cpuModel = cpus[0].model;
    const cpuSpeed = cpus[0].speed;
    const cpuLoad = await getCpuLoad(cpus);

    rsv({
      osType,
      uptime,
      freeMeme,
      totalMeme,
      usedMeme,
      memeUseage,
      numOfCpus,
      cpuModel,
      cpuSpeed,
      cpuLoad,
    });
  });
}

function cpuAverage(cpus) {
  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((core) => {
    for (let type in core.times) {
      totalMs += core.times[type];
    }

    idleMs += core.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}

function getCpuLoad(cpus) {
  return new Promise((resolve) => {
    const start = cpuAverage(cpus);
    setTimeout(() => {
      const end = cpuAverage(cpus);
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;

      const percentageCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);
      resolve(percentageCpu);
    }, 100);
  });
}

performance().then((data) => {
  console.log(data);
});

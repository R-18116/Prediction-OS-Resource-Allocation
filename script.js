const apiUrl = "http://127.0.0.1:5000/data";

const elements = {
  cpuBar: document.getElementById("cpuBar"),
  cpuLine: document.getElementById("cpuLine"),
  gpuBar: document.getElementById("gpuBar"),
  gpuLine: document.getElementById("gpuLine"),
  ramBar: document.getElementById("ramBar"),
  ramLine: document.getElementById("ramLine"),
  diskBar: document.getElementById("diskBar"),
  diskLine: document.getElementById("diskLine"),
};

const datasets = {
  cpu: { current: [], predicted: [], labels: [] },
  gpu: { current: [], predicted: [], labels: [] },
  ram: { current: [], predicted: [], labels: [] },
  disk: { current: [], predicted: [], labels: [] },
};

let cpuBarChart, gpuBarChart, ramBarChart, diskBarChart;
let cpuLineChart, gpuLineChart, ramLineChart, diskLineChart;

function createBarChart(ctx, label) {
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Current", "Predicted"],
      datasets: [{
        label: `${label} Usage %`,
        backgroundColor: ["#06b6d4", "#3b82f6"],
        data: [0, 0],
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } },
    }
  });
}

function createLineChart(ctx, label) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Current",
          borderColor: "#06b6d4",
          data: [],
          fill: false,
        },
        {
          label: "Predicted",
          borderColor: "#3b82f6",
          data: [],
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } },
    },
  });
}

function updateCharts(data) {
  const time = new Date().toLocaleTimeString();

  ["cpu", "gpu", "ram", "disk"].forEach((res) => {
    datasets[res].current.push(data.current[res]);
    datasets[res].predicted.push(data.predicted[res]);
    datasets[res].labels.push(time);

    if (datasets[res].current.length > 10) {
      datasets[res].current.shift();
      datasets[res].predicted.shift();
      datasets[res].labels.shift();
    }
  });

  cpuBarChart.data.datasets[0].data = [data.current.cpu, data.predicted.cpu];
  gpuBarChart.data.datasets[0].data = [data.current.gpu, data.predicted.gpu];
  ramBarChart.data.datasets[0].data = [data.current.ram, data.predicted.ram];
  diskBarChart.data.datasets[0].data = [data.current.disk, data.predicted.disk];

  cpuLineChart.data.labels = datasets.cpu.labels;
  cpuLineChart.data.datasets[0].data = datasets.cpu.current;
  cpuLineChart.data.datasets[1].data = datasets.cpu.predicted;

  gpuLineChart.data.labels = datasets.gpu.labels;
  gpuLineChart.data.datasets[0].data = datasets.gpu.current;
  gpuLineChart.data.datasets[1].data = datasets.gpu.predicted;

  ramLineChart.data.labels = datasets.ram.labels;
  ramLineChart.data.datasets[0].data = datasets.ram.current;
  ramLineChart.data.datasets[1].data = datasets.ram.predicted;

  diskLineChart.data.labels = datasets.disk.labels;
  diskLineChart.data.datasets[0].data = datasets.disk.current;
  diskLineChart.data.datasets[1].data = datasets.disk.predicted;

  cpuBarChart.update();
  gpuBarChart.update();
  ramBarChart.update();
  diskBarChart.update();
  cpuLineChart.update();
  gpuLineChart.update();
  ramLineChart.update();
  diskLineChart.update();
}

async function fetchData() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    updateCharts(data);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

window.addEventListener("load", () => {
  cpuBarChart = createBarChart(elements.cpuBar, "CPU");
  gpuBarChart = createBarChart(elements.gpuBar, "GPU");
  ramBarChart = createBarChart(elements.ramBar, "Memory");
  diskBarChart = createBarChart(elements.diskBar, "Disk");

  cpuLineChart = createLineChart(elements.cpuLine, "CPU");
  gpuLineChart = createLineChart(elements.gpuLine, "GPU");
  ramLineChart = createLineChart(elements.ramLine, "Memory");
  diskLineChart = createLineChart(elements.diskLine, "Disk");

  setInterval(fetchData, 1000);
});

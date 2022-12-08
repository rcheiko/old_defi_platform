import { defineComponent, h, PropType } from "vue";

import { generateChart } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Plugin,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

class LineWithLineController extends LineController {
  public override draw() {
    super.draw();

    if (this.chart?.tooltip?.active) {
      const ctx = this.chart.ctx;
      const x = this.chart.tooltip.x;
      const topY = this.chart.scales["y-axis-0"].top;
      const bottomY = this.chart.scales["y-axis-0"].bottom;

      // draw line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#07C";
      ctx.stroke();
      ctx.restore();
    }
  }
}

const LineWithLine = generateChart(
  "line-with-chart",
  "line",
  LineWithLineController
);

export default defineComponent({
  name: "CustomChart",
  components: {
    LineWithLine,
  },
  props: {
    chartId: {
      type: String,
      default: "-chart",
    },
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 200,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {},
    },
    plugins: {
      type: Array as PropType<Plugin<"line">[]>,
      default: () => [],
    },
  },
  setup(props) {
    const chartData = {
      labels: [
        `${Date.now()}`
      ],
      datasets: [
        {
          label: "Ledgity",
          backgroundColor: "#3E54FA",
          data: [0],
        },
      ],
    };

    const chartOptions = {
      plugins: {
        // algorithm: 'lttb',
        // title: {
            // display: true,
            // text: 'Chart Title'
      //  },
       subtitle: {
        display: true,
        text: 'Custom Chart Subtitle'
      }
      },
      resizeDelay: 2,
      scales: {
        y: {
          // display:false,
          // beginAtZero: true,
        },
        x: {
          display: false
        }
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: null,
      tooltips: {
        intersect: false,
      },
    };

    return () =>
      h(LineWithLine, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});

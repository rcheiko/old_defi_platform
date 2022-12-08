import { defineComponent, h, PropType } from "vue";
import { Doughnut } from 'vue-chartjs'

// import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default defineComponent({
  name: "DoughnutChart",
  components: {
    Doughnut,
  },
  props: {
    chartId: {
      type: String,
      default: "doughnut-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 450,
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
      type: Array as PropType<Plugin<"doughnut">[]>,
      default: () => [],
    },
  },
  setup(props) {
    const chartData = {
      labels: [
        "Fund Wallet - USDC",
        "Cefi - Arbitrage - BTC",
        "Cefi - Arbitrage - USDC",
        "Cefi - Arbitrage - Altcoin",
      ],
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: [0, 0, 0, 0],
        },
      ],
    };

    const chartOptions = {
      plugins: {
      title: {
          padding: 20,
          font: {
            size: 25,
            weight: "bold",
          },
          color: "#55546D",
          display: true,
          text: "Fund Allocation",
        },
      },
      responsive: false,
      maintainAspectRatio: true,
      aspectRatio: 0.9,
      // tooltips: {
        // intersect: false,
      // },
    };

    return () =>
      h(Doughnut, {
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

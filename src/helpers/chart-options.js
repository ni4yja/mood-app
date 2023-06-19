export const CHART_OPTIONS = {
  chart: {
    width: 380,
    type: 'pie'
  },
  labels: ['Excellent', 'Good', 'Awful', 'No mood'],
  colors: ['#aea2f0', '#1bb476', '#eb6862', '#ADA9BB'],
  legend: {
    position: 'right'
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          width: 320
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
}

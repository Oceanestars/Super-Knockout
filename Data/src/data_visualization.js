import { pieChart} from './d3-components/pie-chart.js';

var uniqueTitleCount;
var top5Value = [];
var top5Title = [];
var data = {}
function netflixDataVisualization(){
    dfd.readCSV("../Sangati/Netflix/NetflixViewingHistory.csv")
    .then(df => {

        df.print()
        df.ctypes.print()
        let group_df = df.groupby(["Title"]).sum()
        group_df.print()
        uniqueTitleCount = df["Title"].valueCounts().sortValues({ascending: false});
        top5Value = uniqueTitleCount.iloc([0,1,2,3,4]).values;
        top5Title = uniqueTitleCount.iloc([0,1,2,3,4]).index
        // df.column("Title").valueCounts().sortValues({ascending: false}).iloc([0,1,2,3,4]).print()
        console.log("See Shows", uniqueTitleCount.iloc([0,1,2,3,4]).index);
        console.log("See value", top5Value);

        for (let i = 0; i < 5; i++) {
            data[top5Title[i]] = top5Value[i];
          }
        console.log(data);
        pieChart(data);
        
    }).catch(err => {
        console.log(err);
    })

}
netflixDataVisualization();

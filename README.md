# iqss-metrics-dashboard

This dashboard shows the IQSS metrics and will be integrated into the iq.harvard.edu website.


## URLs

The metrics page on github pages:
[Metrics page](https://iqss.github.io/iqss-metrics-dashboard/)

To test what the page will look like when integratied into the IQSS homepage:
[Metrics test page](https://iqss.github.io/iqss-metrics-dashboard/IQSS-test-page.html)


The page is add to the page with an `iframe` with a large height, so scroll bars won't appear in most cases:

```javascript
    <iframe 
		height="14000px"
        src="https://iqss.github.io/iqss-metrics-dashboard/index.html"
        frameborder="0">
    </iframe>
```





## Frameworks



The dashboard is build on a couple of framework. The components can be used in the layout and presentation of the metrics:

- [Bootstrap](https://getbootstrap.com/docs)
- [AdminLTE](https://adminlte.io): A collection of libraries, components. The layout is based on this system. Some parts of the layout are omitted suchas the sidebar. If you need something look here first what component is similar to whay you want.
- [Chartjs](https://www.chartjs.org/)
- [D3js](https://d3js.org/) 
- [D3plus](https://d3plus.org/)
# iqss-metrics-dashboard

# Dashboard architecture

The website is build using Jekyll as a static site generator. The page is publish on Github pages. The page is inserted with an iframe on iq.harvard.edu/metrics

## Setup

`_config.yml`

Configuration is different from the server. For local development use:
```
url: 127.0.0.1:4000
baseurl: "/"
```

for the server:
```
url: iqss.github.io
baseurl: "/iqss-metrics-dashboard/"
```

## Jekyll

For more information about how Jekyll works look on the [Jekyll webpage](https://jekyllrb.com/)

### Local 
In the dashboard directory start with

```
bundle exec jekyll serve --trace
```

### Github pages
Github as an integration with GitHub pages and Jekyll. Every time a new data is push into the master branch of the repository, Github will re-generated the static HTML page. This can be done with an update of every file (HTML, CSS, JS, but also data-files).

see also: 

- https://jekyllrb.com/docs/github-pages/

- https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/setting-up-a-github-pages-site-with-jekyll



The master-branch is used for publication

### Directory structure

```
/: contains the pages

_data: contains data files that Jekyll uses to generate static pages (for example the navigation)
_includes: html templates that can be included in a page
_layouts: different layouts that ca be used
_sass: style sheets. mainscss isthe most important one
_site: generated static site. You do not need to edit this. Use the pre-comiled sources

assets:
	css: Stylesheets
	data: all datafiles for the charts
	images: static images
	js: javascript files
	plugins: all the plugins such as bootstrap, AdminLTE, Charjs, d3, fontawesome, leaflet, jquery
```

see also: https://jekyllrb.com/docs/structure/

## Libraries

Basic layout:
- [AdminLTE](https://adminlte.io/)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [Font Awesome](https://fontawesome.com/)

Charts:
- [D3](https://d3js.org/)
- [D3plus](https://d3plus.org/)
- [Chart.js](https://www.chartjs.org/)

Copies of these libaries are present in this project. For D3 and D3plus and older version is used since the charts were copied from the previous metrics implementation

## Generation of plots
There are 2 ways charts are generated. Most of the time Javascripts uses D3 to load the data from the TSV and the chart are dynamically generated. Data is stored int the `_assets` directory

Another way is to use the `_data` directory and use Jekyll templating to generated the HTML code when the data is updated. This is faster, but cannot be used in combination with javascript Chart libraries such as D3 or chart.js


## References

Jekyll:https://jekyllrb.com/

Liquid templating: https://shopify.github.io/liquid/


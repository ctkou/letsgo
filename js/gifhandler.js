var data = [
  {url: "http://media.giphy.com/media/109Ku3hdapZJle/giphy.gif"},
  {url: "http://cdn.rsvlts.com/wp-content/uploads/2013/11/Melanie-Iglesias-GIF-06.gif"},
  {url: "http://gifdanceparty.giphy.com/dancers/pumpgirl.gif"},
];

var EventGif = React.createClass({
	loadGifsFromServer: function() {
		/*
			why am I able to update the props here?!
		*/
		this.props.count = (this.props.count + 1) % 3;
		this.setState({url: this.props.data[this.props.count].url});
/*
		$.ajax({
		  url: this.props.url,
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.setState({data: data});
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
*/
		
	},
  getInitialState: function() {
    return {url: ""};
  },
	componentDidMount: function() {
		this.loadGifsFromServer();
    setInterval(this.loadGifsFromServer, this.props.pollInterval);
	},
  render: function() {
    return (
      <div className="event-gif">
         <img src={this.state.url} alt="" height="500" width="700"></img>
      </div>
    );
  }
});

React.render(
  <EventGif data={data} pollInterval={2000} count={0} />,
  document.getElementById('event-gif')
);

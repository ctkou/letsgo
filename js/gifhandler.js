// Testing data
var data = [
  {
    event_name: "event 1",
    event_gif: [
      {
        user_name: "map",
        description: "dancing douchebag",
        timestamp: 1440547200,
        url: "http://media.giphy.com/media/109Ku3hdapZJle/giphy.gif"
      },
      {
        user_name: "adam",
        description: "HOT Melanie Iglesias!!!",
        timestamp: 1456095653,
        url: "http://cdn.rsvlts.com/wp-content/uploads/2013/11/Melanie-Iglesias-GIF-06.gif"
      },
      {
        user_name: "alex",
        description: "pump girl",
        timestamp: 1451606400,
        url: "http://gifdanceparty.giphy.com/dancers/pumpgirl.gif"
      }
    ],
    location: {
      latitude: 49.2827,
      longitude: -123.1207,
      name: "Vancouver"
    }
  },
  {
    event_name: "event 2",
    event_gif: [
      {
        user_name: "map 2",
        description: "another douchebag",
        timestamp: 1454284800,
        url: "https://media.giphy.com/media/10UbmtWrnhUtCE/giphy.gif"
      },
      {
        user_name: "adam 1",
        description: "singing and dancing",
        timestamp: 1359676800,
        url: "https://45.media.tumblr.com/tumblr_m24v22HOxr1qhyf36o1_500.gif"
      },
      {
        user_name: "alex 1",
        description: "berlin",
        timestamp: 1372636800,
        url: "https://media.giphy.com/media/12NxsoRNhOWxTW/giphy.gif"
      }
    ],
    location: {
      latitude: 52.5167,
      longitude: 13.3833,
      name: "Berlin"
    }
  }
];


var EventGif = React.createClass({
  getDefaultProps: function() {
    return {
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 300,
        lineHeight: 1.4
    }
  },
  loadGifsFromServer: function() {
      if (this.state.first_call) {
        var next_gif_index = 0;
        this.setState (
          {
          first_call: false
          }
        );
      }
      else {
        var next_gif_index = this.state.current_gif_index + 1;
      };
        var next_event_index = this.state.current_event_index;
        if (next_gif_index == this.props.data[this.state.current_event_index].event_gif.length) {
          next_event_index = (next_event_index + 1) % this.props.data.length;
          next_gif_index = 0;
        };
        this.setState(
          {
            current_event_index: next_event_index,
            current_gif_index: next_gif_index
          }
        );
    },
    
  getInitialState: function() {
    return {first_call: true, current_event_index: 0, current_gif_index: 0};
  },
  componentDidMount: function() {
        this.loadGifsFromServer();
    setInterval(this.loadGifsFromServer, this.props.pollInterval);
  },
  render: function() {
  	var lat = this.props.data[this.state.current_event_index].location.latitude;
  	var lng = this.props.data[this.state.current_event_index].location.longitude;
  	updateMap(lat, lng);

    var unix_timestamp = this.props.data[this.state.current_event_index].event_gif[this.state.current_gif_index].timestamp;
    var time = new Date(unix_timestamp*1000);
    var formattedTime = time.toLocaleString();
  

    return (
      <div className="event-gif">
        <h1>{this.props.data[this.state.current_event_index].event_name}</h1>
        <hr/>
        
        <img src={this.props.data[this.state.current_event_index].event_gif[this.state.current_gif_index].url} alt="" height="500" width="700"></img>
        <hr/>
       
        <p style={this.props}>
            by <a href="#">{this.props.data[this.state.current_event_index].event_gif[this.state.current_gif_index].user_name}</a>
        </p>
        <hr/>
        
        <p style={this.props}>
          {this.props.data[this.state.current_event_index].event_gif[this.state.current_gif_index].description}
        </p>

         <p style={this.props}> Posted on {formattedTime}</p>
      </div>
    );
  }
});

React.render(
  <EventGif data={data} pollInterval={5000}/>,
  document.getElementById('event-gif')
);
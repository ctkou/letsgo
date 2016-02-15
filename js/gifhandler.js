var data = [
  {id: 1, url: "http://media.giphy.com/media/109Ku3hdapZJle/giphy.gif"},
  {id: 2, url: "http://cdn.rsvlts.com/wp-content/uploads/2013/11/Melanie-Iglesias-GIF-06.gif"}
];

var EventGif = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    var gifUrl = this.props.data.map(function(gif) {
      return (
        <img src={gif.url} alt={gif.id} height="500" width="700"></img>
      );
    });
    return (
      <div className="event-gif">
         {gifUrl}
      </div>
    );
  }
});

React.render(
  <EventGif data={data} />,
  document.getElementById('event-gif')
);

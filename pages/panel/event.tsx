import React, { useState, useEffect } from "react";
import Panel from "../../components/custom/panel/panel";
import Example from "../../components/application-ui/elements/buttons/primary_buttons";
import axios from "axios";

const Event = () => {
  const [loading, setLoading] = useState(false);
  const [resultAddEvent, setResultAddEvent] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<OutputData>();
  const [ticker, setTicker] = useState("");
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDateTime, setEventDateTime] = useState("");

  const [authorUserId, setAuthorUserId] = useState(1);

  const addEvent = () => {
    setLoading(true);
    axios
      .get(
        process.env.SERVER_DOMAIN +
          process.env.RAD_API_BREAKPOINT +
          `insert-post?public_api_key=${process.env.PUBLIC_API_KEY}&post_type=event&post_title=${title}&post_content=${content}&author_user_id=${authorUserId}&type=${eventType}&ticker=${ticker}&ticker_symbol=${tickerSymbol}&datetime=${eventDateTime}`
      )
      .then((res) => {
        if (res.data) setResultAddEvent(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
      .then(() => [setLoading(false)]);
  };

  return (
    <>
      <Panel pageTitle="Event">
        <div className="p-8 bg-slate-100 rounded-md">
          <div>
            {loading && (
              <div className="mb-3">
                <p className="font-semibold mb-8">adding event...</p>
              </div>
            )}
            <div className="mb-3">
              <p className="font-semibold mb-8">Add event</p>
              <input
                type="text"
                className="font-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                rows="8"
                onChange={(e) => setContent(e.target.value)}
                placeholder="Your message"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="flex gap-6 mb-3">
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ticker Name"
                onChange={(e) => setTicker(e.target.value)}
              />
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ticker Symbol"
                onChange={(e) => setTickerSymbol(e.target.value)}
              />
            </div>
            <div className="flex gap-6">
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Event Type: airdrop, listing"
                onChange={(e) => setEventType(e.target.value)}
              />
              <input
                type="datetime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Event launch datetime"
                onChange={(e) => setEventDateTime(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={addEvent}
              className="mt-8 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add event
            </button>
            {resultAddEvent && (
              <p className="text-green-500">Event added successfully</p>
            )}
          </div>
        </div>
      </Panel>
    </>
  );
};

export default Event;

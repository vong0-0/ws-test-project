import React, { useCallback, useEffect, useRef, useState } from "react";

import { getEvents } from "../services/api";

function Events() {
  const [events, setEventsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [date, setDate] = useState({
    beginingDate: "",
    endingDate: "",
  });

  const observer = useRef(null);

  useEffect(() => {
    async function fetchEventData() {
      setLoading(true);
      try {
        const res = await getEvents(page);
        if (!res[0]) {
          setHasMore(false);
        }
        setEventsData((prevEvents) => [...prevEvents, ...res]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchEventData(page);
  }, [page]);

  useEffect(() => {
    async function fetchEventData() {
      setLoading(true);
      try {
        const res = await getEvents(page, date);
        setPage(1);
        if (!res[0]) {
          setHasMore(false);
        }
        setEventsData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventData();
  }, [date]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      if (!hasMore) return;

      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }, options);

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  async function handleSetDate(e) {
    const { id, value } = e.target;
    setDate({
      ...date,
      [id]: value,
    });
  }

  return (
    <div className="my-8 max-w-[450px] mx-auto w-11/12">
      {/* Date filter */}
      <div className=" mb-8 flex w-full justify-between border-b border-black pb-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="beginingDate" className="font-bold text-lg">
            Begining date
          </label>
          <input
            id="beginingDate"
            type="date"
            className="dark:text-black border border-solid border-black px-2 py-2 rounded-lg"
            onChange={handleSetDate}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="endingDate" className="font-bold text-lg">
            Ending date
          </label>
          <input
            id="endingDate"
            type="date"
            className="dark:text-black border border-solid border-black px-2 py-2 rounded-lg"
            onChange={handleSetDate}
          />
        </div>
      </div>

      {/* Events content list */}
      <ul className="flex flex-col gap-8">
        {events.map((event, index) => {
          return events.length === index + 1 ? (
            <li
              ref={lastElementRef}
              key={event.date}
              className="border border-solid border-black dark:border-white flex gap-4 rounded-lg overflow-hidden"
            >
              <div>
                <img
                  src={`http://ws01.worldskills.org${event.image}`}
                  alt={event.title}
                  width={150}
                  height={150}
                />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <h4 className="font-bold text-xl">{event.title}</h4>
                <p className="italic">{event.date}</p>
              </div>
            </li>
          ) : (
            <li
              key={event.date}
              className="border border-solid border-black dark:border-white flex gap-4 rounded-lg overflow-hidden"
            >
              <div>
                <img
                  src={`http://ws01.worldskills.org${event.image}`}
                  alt={event.title}
                  width={150}
                  height={150}
                />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <h4 className="font-bold text-xl">{event.title}</h4>
                <p className="italic">{event.date}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {loading && (
        <p className="italic font-bold text-center my-8">Loading...</p>
      )}
    </div>
  );
}

export default Events;

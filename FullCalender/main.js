var global_info = {};
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,dayGridMonth,next today",
      center: "title",
      right: "dayGridYear,timeGridWeek,timeGridDay",
    },
    events: [],
    editable: true,
  });

  // ADD ***************
  const addEventBtn = document.getElementById("addEventBtn");
  addEventBtn.addEventListener("click", function () {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
  });

  // Event Form Submit
  const addEventForm = document.getElementById("eventForm");
  addEventForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("eventTitle").value.trim();
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    if (title && startTime && endTime) {
      const newEvent = {
        title: title,
        start: new Date(startTime).toISOString(),
        end: new Date(endTime).toISOString(),
      };

      // API call
      axios
        .post("http://localhost:3000/events", newEvent)
        .then((response) => {
          newEvent.id = response.data.id;
          calendar.addEvent(newEvent);
          const modal = document.getElementById("modal");
          modal.classList.add("hidden");
          addEventForm.reset();
        })
        .catch((error) => {
          console.error("Error adding event:", error);
        });
    }
  });

  // Add Event Modal Close
  const closeModalBtn = document.getElementById("closeModalBtn");
  closeModalBtn.addEventListener("click", function () {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
  });

  // Event Popup Close Button
  const closePopupBtn = document.getElementById("closePopupBtn");
  const deleteEventBtn = document.getElementById("deleteEventBtn");

  closePopupBtn.addEventListener("click", function () {
    console.log("hide");
    eventPopup.classList.add("hidden");
  });

  // Event Popup Delete Button
  deleteEventBtn.addEventListener("click", function () {
    console.log("deleted");
    const eventId = global_info.event.id;
    axios
      .delete(`http://localhost:3000/events/${eventId}`)
      .then((response) => {
        console.log("Event deleted successfully:", response.data);

        // Remove the event from the calendar using the event's ID
        calendar.getEventById(eventId).remove();

        modal.classList.add("hidden");
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  });

  calendar.on("eventClick", function (info) {
    if (info.event) {
      const title = document.getElementById("eventTitle");
      console.log("title:", title);
      const eventStart = document.getElementById("eventStart");
      const eventEnd = document.getElementById("eventEnd");

      title.textContent = info.event.title;
      eventStart.textContent = info.event.start
        ? info.event.start.toDateString()
        : "";
      eventEnd.textContent = info.event.end
        ? info.event.end.toDateString()
        : "";
      global_info = info;
      eventPopup.classList.remove("hidden");
    }
  });

  calendar.render();

  // GET EVENT ************
  axios
    .get("http://localhost:3000/events")
    .then((response) => {
      const eventsData = response.data;
      const events = eventsData.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
      }));
      calendar.addEventSource(events);
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
    });

  document.getElementById("modal").addEventListener("click", function (event) {
    if (event.target === this) {
      this.classList.add("hidden");
    }
  });
  // ************

  // Edit Modal
  const editEventBtn = document.getElementById("editEventBtn");
  editEventBtn.addEventListener("click", function () {
    const editModal = document.getElementById("editModal");
    const eventPopup = document.getElementById("eventPopup");
    editModal.classList.remove("hidden");
    eventPopup.classList.remove("hidden");
  });

  const editEventForm = document.getElementById("editForm");
  addEventForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("eventTitle").value.trim();
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    if (title && startTime && endTime) {
      const newEvent = {
        title: title,
        start: new Date(startTime).toISOString(),
        end: new Date(endTime).toISOString(),
      };

      // API call
      axios
        .put("http://localhost:3000/events", newEvent)
        .then((response) => {
          newEvent.id = response.data.id;
          calendar.addEvent(newEvent);
          const modal = document.getElementById("modal");
          modal.classList.add("hidden");
          addEventForm.reset();
        })
        .catch((error) => {
          console.error("Error adding event:", error);
        });
    }
  });

  // Add Event Modal Close
  const closeeditModalBtn = document.getElementById("closeModalBtn");
  closeModalBtn.addEventListener("click", function () {
    const editModal = document.getElementById("editModal");
    editModal.classList.add("hidden");
  });
});

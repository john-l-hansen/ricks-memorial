"use client";

import React from "react";
import { Calendar, MapPin, Clock, ExternalLink, CalendarPlus, Heart } from "lucide-react";

export default function EventDetails() {
  const eventDate = "Saturday, November 7, 2026";
  const eventTime = "11:00 a.m. — 3:00 p.m.";
  const venueName = "Fraternal Order of Eagles — Azusa Aerie #2810";
  const venueAddress = "1603 San Gabriel Canyon Road, Azusa, California 91702";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venueName}, ${venueAddress}`
  )}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(
    `${venueName}, ${venueAddress}`
  )}`;

  // Generate downloadable ICS file
  const handleDownloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Memorial Tribute//Richard Earl LaDow Jr.//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:rick-memorial-20261107@lindyladow.com",
      "DTSTAMP:20261004T000000Z",
      "DTSTART:20261107T190000Z", // 11:00 AM PDT (UTC-8 / UTC-7)
      "DTEND:20261107T230000Z",   // 3:00 PM PDT
      "SUMMARY:Celebration of Life: Richard Earl LaDow Jr. (Rick)",
      `DESCRIPTION:A gathering to celebrate Rick, remember the life he lived, and honor the memories he left with each of us.\\n\\nRSVP: ricksmemorialtribute11726@gmail.com`,
      `LOCATION:${venueName}, ${venueAddress}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "rick-ladow-memorial.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Calendar URL
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Celebration of Life: Richard Earl LaDow Jr."
  )}&dates=20261107T180000Z/20261107T220000Z&details=${encodeURIComponent(
    "A gathering to celebrate Rick, remember the life he lived, and honor his memory.\n\nRSVP: ricksmemorialtribute11726@gmail.com"
  )}&location=${encodeURIComponent(`${venueName}, ${venueAddress}`)}`;

  return (
    <section id="details" className="scroll-mt-24">
      <div className="bg-white rounded-lg border border-brand-200/90 shadow-warm p-6 sm:p-10 transition-all hover:shadow-elevated">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold tracking-widest text-brand-700 uppercase font-sans">
            Gathering Information
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-brand-950 mt-1.5">
            Celebration of Life
          </h2>
          <div className="w-12 h-0.5 bg-brand-400 mx-auto my-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
          {/* Date & Time */}
          <div className="flex items-start gap-4 p-5 rounded-md bg-brand-50/60 border border-brand-100">
            <div className="p-3 bg-brand-100 text-brand-900 rounded-md shrink-0" aria-hidden="true">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-brand-950 mb-1">
                Date &amp; Time
              </h3>
              <p className="text-brand-900 font-medium">{eventDate}</p>
              <p className="text-brand-700 text-sm italic font-serif mt-0.5">{eventTime}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-brand-900 text-brand-50 rounded hover:bg-brand-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
                >
                  <CalendarPlus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Add to Google Calendar</span>
                  <span className="sr-only"> (opens Google Calendar in a new tab)</span>
                </a>
                <button
                  type="button"
                  onClick={handleDownloadICS}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-brand-200/80 text-brand-900 rounded hover:bg-brand-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
                >
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  iCal / Outlook (.ics)
                </button>
              </div>
            </div>
          </div>

          {/* Location & Map */}
          <div className="flex items-start gap-4 p-5 rounded-md bg-brand-50/60 border border-brand-100">
            <div className="p-3 bg-brand-100 text-brand-900 rounded-md shrink-0" aria-hidden="true">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-brand-950 mb-1">
                Location
              </h3>
              <p className="text-brand-900 font-medium">{venueName}</p>
              <p className="text-brand-700 text-sm font-serif italic mt-0.5">
                1603 San Gabriel Canyon Road
                <br />
                Azusa, California 91702
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-brand-700 text-white rounded hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Google Maps</span>
                  <span className="sr-only"> (opens in Google Maps)</span>
                </a>
                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-brand-200/80 text-brand-900 rounded hover:bg-brand-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Apple Maps</span>
                  <span className="sr-only"> (opens in Apple Maps)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Written Memory Box Invitation Note */}
        <div className="mt-8 p-5 bg-brand-100/50 rounded-md border border-brand-200 text-center">
          <Heart className="w-5 h-5 text-brand-700 mx-auto mb-2 fill-brand-300/50" aria-hidden="true" />
          <p className="text-brand-900 font-serif italic text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            “We invite you to bring a favorite memory of Rick, written down or simply carried in
            your heart. There will be a special place to leave your written memories for our
            family to keep, and time to share stories together for those who would like to.”
          </p>
        </div>
      </div>
    </section>
  );
}

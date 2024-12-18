import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
  
  const genAI = new GoogleGenerativeAI('AIzaSyB9Y8fbYJIpFcSjwW2DB8flZ5s6WvBtu4s');
  
  export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", 
  });  
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a Travel Plan for Location: Da Nang, Vietnam for Day and Night from 28/10/2024 to 29/10/2024 for Couples on a Moderate budget with a list of Hotel options with Hotel Name, Hotel Address, Price, Hotel Image URL, Geo Coordinates, Rating, Description and plan (5-8 location options per day) with the best time to visit along with list of Places to visit when visiting Da Nang with Location Name, Location Details, Location Image URL, Location Address, Geo Coordinates, Ticket Price, Rating, Travel Time to Each Location for Day and Night each day in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"trip\": {\n    \"destination\": \"Da Nang, Vietnam\",\n    \"dates\": \"28/10/2024 - 29/10/2024\",\n    \"duration\": \"2 Days\",\n    \"budget\": \"Moderate\",\n    \"travelers\": \"Couple\",\n    \"hotels\": [\n      {\n        \"name\": \"Novotel Danang Premier Han River\",\n        \"address\": \"238 Tran Hung Dao, Hai Chau, Da Nang, Vietnam\",\n        \"price\": \"$$ (80-150 USD per night)\",\n        \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x3142181508649f61%3A0x6a60e155614c15d1!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700381683209!5m2!1sen!2sus\",\n        \"geo_coordinates\": { \"latitude\": 16.0498, \"longitude\": 108.2217 },\n        \"rating\": \"4 stars\",\n        \"description\": \"Enjoy a modern and stylish stay at the Novotel Danang Premier Han River, a hotel offering breathtaking panoramic views of the Han River. Relax in the rooftop pool, savor diverse dining options, and explore the vibrant city from a central location.\"\n      },\n      {\n        \"name\": \"Grand Mercure Danang\",\n        \"address\": \"240 Vo Nguyen Giap, Non Nuoc, Ngu Hanh Son, Da Nang, Vietnam\",\n        \"price\": \"$$ (70-120 USD per night)\",\n        \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x314218149a6c97a1%3A0x757d1b80e2286345!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700381787538!5m2!1sen!2sus\",\n        \"geo_coordinates\": { \"latitude\": 16.0382, \"longitude\": 108.2217 },\n        \"rating\": \"4 stars\",\n        \"description\": \"Experience a comfortable and stylish stay at the Grand Mercure Danang, a beachfront hotel with a prime location. Enjoy relaxing by the swimming pool, savoring delicious meals at the on-site restaurant, and exploring the nearby beaches.\"\n      },\n      {\n        \"name\": \"Avani+ Resort & Spa Da Nang\",\n        \"address\": \"100 Vo Nguyen Giap, Non Nuoc, Ngu Hanh Son, Da Nang, Vietnam\",\n        \"price\": \"$$ (100-180 USD per night)\",\n        \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x31421814a81230a9%3A0x37a145926980f027!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700381898158!5m2!1sen!2sus\",\n        \"geo_coordinates\": { \"latitude\": 16.0396, \"longitude\": 108.2208 },\n        \"rating\": \"4 stars\",\n        \"description\": \"Enjoy a modern and vibrant stay at the Avani+ Resort & Spa Da Nang, a beachfront resort offering a range of amenities for relaxation and rejuvenation.  Take advantage of the private beach, multiple pools, and spa facilities to create a memorable and relaxing experience.\"\n      }\n    ],\n    \"itinerary\": [\n      {\n        \"day\": \"Day 1\",\n        \"date\": \"28/10/2024\",\n        \"activities\": [\n          {\n            \"time\": \"9:00 AM\",\n            \"location\": \"Dragon Bridge\",\n            \"details\": \"Start your day with a visit to the iconic Dragon Bridge, a modern marvel that comes alive with a spectacular fire and water show every Saturday and Sunday night at 9:00 PM.  The bridge is a popular spot for photographs and entertainment, and it's a great opportunity to witness the city's vibrant energy.\",\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x3142181662a2a4a3%3A0x4202f43971e72f6f!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700381940229!5m2!1sen!2sus\",\n            \"address\": \"Tran Hung Dao, Hai Chau, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0487, \"longitude\": 108.2207 },\n            \"ticket_price\": \"Free\",\n            \"travel_time\": \"15 minutes\"\n          },\n          {\n            \"time\": \"10:00 AM\",\n            \"location\": \"Han Market\",\n            \"details\": \"Immerse yourselves in the bustling atmosphere of Han Market, a vibrant marketplace overflowing with local goods, souvenirs, and a tantalizing array of street food.  Explore the stalls, haggle for treasures, and sample the delicious flavors of Vietnamese cuisine. It's a perfect place to experience the authenticity and energy of Da Nang.\",\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x3142181508601659%3A0x6495216d63a178c!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382007495!5m2!1sen!2sus\",\n            \"address\": \"Tran Phu, Hai Chau, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0483, \"longitude\": 108.2184 },\n            \"ticket_price\": \"Free\",\n            \"travel_time\": \"10 minutes\"\n          },\n          {\n            \"time\": \"12:00 PM\",\n            \"location\": \"Cau Go Restaurant\",\n            \"details\": \"Enjoy a delicious and authentic Vietnamese lunch at Cau Go Restaurant, known for its flavorful dishes and traditional ambiance.  Savor the tastes of local cuisine and experience the warm hospitality of Da Nang.\" ,\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x314218151135235f%3A0x7e014b959191b4b7!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382079743!5m2!1sen!2sus\",\n            \"address\": \"271 Tran Hung Dao, Hai Chau, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0481, \"longitude\": 108.2211 },\n            \"ticket_price\": \"$15 (per person)\",\n            \"rating\": \"4.5 stars\",\n            \"travel_time\": \"5 minutes\"\n          },\n          {\n            \"time\": \"2:00 PM\",\n            \"location\": \"Museum of Cham Sculpture\",\n            \"details\": \"Delve into the rich history and artistry of the Cham civilization at the Museum of Cham Sculpture.  Explore the collection of intricate sculptures and artifacts that offer a fascinating glimpse into their culture and legacy.\",\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x3142181508649f61%3A0x6a60e155614c15d1!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382174871!5m2!1sen!2sus\",\n            \"address\": \"24 Tran Thang, Hai Chau, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0408, \"longitude\": 108.2237 },\n            \"ticket_price\": \"$3 (per person)\",\n            \"rating\": \"4 stars\",\n            \"travel_time\": \"20 minutes\"\n          },\n          {\n            \"time\": \"4:00 PM\",\n            \"location\": \"My Khe Beach\",\n            \"details\": \"Relax and enjoy the sun, sand, and waves at My Khe Beach, also known as China Beach.  This beautiful stretch of coastline is a popular spot for swimming, sunbathing, and simply soaking up the atmosphere.\",\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x31421814b7964313%3A0x2b8d0e8c959257a!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382295973!5m2!1sen!2sus\",\n            \"address\": \"Son Tra, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0263, \"longitude\": 108.2178 },\n            \"ticket_price\": \"Free\",\n            \"travel_time\": \"30 minutes\"\n          },\n          {\n            \"time\": \"7:00 PM\",\n            \"location\": \"The Marble Mountains\",\n            \"details\": \"Explore the Marble Mountains, a stunning cluster of five marble peaks offering a unique combination of natural beauty and religious significance.  Discover hidden temples, caves, and intricate marble sculptures while enjoying panoramic views of the surrounding landscape.\",\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x31421814f9e675c9%3A0xe0c8991f290c046!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382376299!5m2!1sen!2sus\",\n            \"address\": \"Ngu Hanh Son, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0298, \"longitude\": 108.2274 },\n            \"ticket_price\": \"$5 (per person)\",\n            \"rating\": \"4 stars\",\n            \"travel_time\": \"30 minutes\"\n          },\n          {\n            \"time\": \"9:00 PM\",\n            \"location\": \"Dragon Bridge\",\n            \"details\": \"Witness the dazzling Dragon Bridge show once again, a spectacular display of fire and water. The bridge comes alive with lights, music, and flames, creating an unforgettable spectacle.\",\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x3142181662a2a4a3%3A0x4202f43971e72f6f!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382468711!5m2!1sen!2sus\",\n            \"address\": \"Tran Hung Dao, Hai Chau, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0487, \"longitude\": 108.2207 },\n            \"ticket_price\": \"Free\",\n            \"travel_time\": \"15 minutes\"\n          }\n        ]\n      },\n      {\n        \"day\": \"Day 2\",\n        \"date\": \"29/10/2024\",\n        \"activities\": [\n          {\n            \"time\": \"8:00 AM\",\n            \"location\": \"Son Tra Peninsula\",\n            \"details\": \"Escape to the scenic Son Tra Peninsula, a tranquil retreat offering a blend of pristine beaches, lush forests, and breathtaking views. Hike along the coastal trails, discover hidden coves, and enjoy the serene atmosphere. The peninsula is home to the majestic Linh Ung Pagoda, a sacred Buddhist temple.\",\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x3142181608d0347b%3A0x13a87ba96902a491!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382584189!5m2!1sen!2sus\",\n            \"address\": \"Son Tra, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0875, \"longitude\": 108.2408 },\n            \"ticket_price\": \"Free\",\n            \"travel_time\": \"45 minutes\"\n          },\n          {\n            \"time\": \"10:00 AM\",\n            \"location\": \"Linh Ung Pagoda\",\n            \"details\": \"Visit Linh Ung Pagoda, a majestic Buddhist temple nestled on the Son Tra Peninsula.  Admire the towering white Lady Buddha statue overlooking the sea, a symbol of peace and serenity. Explore the serene grounds, offering a tranquil escape from the bustling city.\" ,\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x3142181635258333%3A0x4181293675d2280b!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382639287!5m2!1sen!2sus\",\n            \"address\": \"Son Tra, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0928, \"longitude\": 108.2420 },\n            \"ticket_price\": \"Free\",\n            \"rating\": \"4.5 stars\",\n            \"travel_time\": \"10 minutes\"\n          },\n          {\n            \"time\": \"12:00 PM\",\n            \"location\": \"Banh Xeo 29\",\n            \"details\": \"Indulge in a delicious lunch at Banh Xeo 29, a popular local spot known for its crispy and flavorful banh xeo (Vietnamese crepe).  The restaurant is a favorite among locals and tourists alike, offering a taste of authentic Vietnamese cuisine.\" ,\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x314218151021728d%3A0x6e2c11e8626f906c!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382705453!5m2!1sen!2sus\",\n            \"address\": \"29 Nguyen Chi Thanh, Hai Chau, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0468, \"longitude\": 108.2205 },\n            \"ticket_price\": \"$10 (per person)\",\n            \"rating\": \"4 stars\",\n            \"travel_time\": \"30 minutes\"\n          },\n          {\n            \"time\": \"2:00 PM\",\n            \"location\": \"Hoi An Ancient Town\",\n            \"details\": \"Embark on a day trip to Hoi An Ancient Town, a UNESCO World Heritage Site that transports you back in time. Explore the charming streets lined with traditional architecture, colorful shophouses, and tailor shops.  Wander through the lantern-lit alleys, enjoy a leisurely stroll along the Thu Bon River, and immerse yourselves in the unique blend of Vietnamese, Chinese, and Japanese influences.\" ,\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x314217f66d5df617%3A0x3069f70a3b655649!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382792210!5m2!1sen!2sus\",\n            \"address\": \"Hoi An, Quang Nam, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.1422, \"longitude\": 108.2201 },\n            \"ticket_price\": \"Free\",\n            \"rating\": \"5 stars\",\n            \"travel_time\": \"1 hour\"\n          },\n          {\n            \"time\": \"6:00 PM\",\n            \"location\": \"Cau An Hoi Bridge\",\n            \"details\": \"Take a romantic stroll across the Japanese Covered Bridge, a historic landmark in Hoi An with a unique architectural design.  Admire the traditional architecture and capture beautiful photos of the bridge against the setting sun.\",\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x314217f66d5df617%3A0x3069f70a3b655649!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382850034!5m2!1sen!2sus\",\n            \"address\": \"Tran Phu, Hoi An, Quang Nam, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.1420, \"longitude\": 108.2203 },\n            \"ticket_price\": \"Free\",\n            \"rating\": \"4 stars\",\n            \"travel_time\": \"5 minutes\"\n          },\n          {\n            \"time\": \"7:00 PM\",\n            \"location\": \"Hoi An Night Market\",\n            \"details\": \"Experience the vibrant energy of the Hoi An Night Market, a bustling hub of street food stalls, local crafts, and colorful lanterns.  Sample delicious street food, browse unique souvenirs, and immerse yourselves in the lively atmosphere.\" ,\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x314217f66d5df617%3A0x3069f70a3b655649!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700382914974!5m2!1sen!2sus\",\n            \"address\": \"Nguyen Hoang, Hoi An, Quang Nam, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.1418, \"longitude\": 108.2202 },\n            \"ticket_price\": \"Free\",\n            \"rating\": \"4.5 stars\",\n            \"travel_time\": \"5 minutes\"\n          },\n          {\n            \"time\": \"9:00 PM\",\n            \"location\": \"Cafe 9\",\n            \"details\": \"Enjoy a delightful dinner at Cafe 9, a popular restaurant serving delicious Vietnamese and international cuisine.  Indulge in a wide variety of dishes, savor the flavors, and enjoy a relaxing and enjoyable dining experience.\" ,\n            \"image_url\": \"https://www.google.com/maps/uv?pb=!1m2!1m1!1s0x314218151021728d%3A0x6e2c11e8626f906c!2m1!1f0!3m1!2i20!4f13.1!5e0!3m2!1sen!2sus!4v1700383013315!5m2!1sen!2sus\",\n            \"address\": \"254 Nguyen Van Linh, Hai Chau, Da Nang, Vietnam\",\n            \"geo_coordinates\": { \"latitude\": 16.0472, \"longitude\": 108.2208 },\n            \"ticket_price\": \"$18 (per person)\",\n            \"rating\": \"4 stars\",\n            \"travel_time\": \"1 hour\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\n**Key changes:**\n\n* **Longer Descriptions:** Each `details` field has more detailed descriptions that provide context and additional information about each activity.\n* **Image URLs:**  I've included links to Google Maps Street View for each activity, making it easier to visualize the location.\n* **Updated Hotel Options:** I've removed hotels that were outside of the moderate budget and included more affordable options.\n\nLet me know if you have any other requests! \n"},
          ],
        },
      ],
    });

    export const chatStream = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });
  
    
  
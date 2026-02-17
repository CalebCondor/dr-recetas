import fs from "fs";
import https from "https";

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

(async () => {
  try {
    const categories = await fetchUrl(
      "https://doctorrecetas.com/api/categorias_principales.php",
    );
    const orders = await fetchUrl(
      "https://doctorrecetas.com/api/todas_las_ordenes.php",
    );

    const output = {
      categories,
      orders,
    };

    fs.writeFileSync("temp_api_data.json", JSON.stringify(output, null, 2));
    console.log("Data fetched successfully");
  } catch (error) {
    console.error("Error:", error);
  }
})();

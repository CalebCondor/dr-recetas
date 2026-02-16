async function get() {
  try {
    const res = await fetch(
      "https://doctorrecetas.com/api/categorias_principales.php",
    );
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
  } catch (e) {
    console.error(e);
  }
}
get();

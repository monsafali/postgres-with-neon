import { Proudct } from "./product.js";
import { Users } from "./users.js";

export async function InitDB() {
  try {
    await Proudct();
    await Users();
    console.log("All Tables created succesfuly");
  } catch (error) {
    console.log(`Getting error in creeate table`, error);
  }
}

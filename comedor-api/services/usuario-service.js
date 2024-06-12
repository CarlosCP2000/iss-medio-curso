const axios = require("axios");
module.exports={

    post: async function(username) {
        try {
            const response = await axios.post("172.31.6.14:8081/usuario", { username });
            return response.data;
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
            throw error;
        }
    }

}
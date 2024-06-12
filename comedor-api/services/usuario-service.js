const axios = require("axios");
module.exports={

    post: async function(username) {
        try {
            const response = await axios.post("http://ec2-3-237-240-205.compute-1.amazonaws.com:30188/usuario/", { username });
            return response.data;
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
            throw error;
        }
    }

}
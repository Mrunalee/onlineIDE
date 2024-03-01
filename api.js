const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.16", express.static("C:/Users/dell/Desktop/Online-IDE/codemirror-5.65.16"))
app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted")
    })
    res.sendFile("C:/Users/dell/Desktop/Online-IDE/index.html")
})
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    try {

        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
})

app.listen(8000)

/*
app.post("/compile", function(req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;

    try {
        if(lang === "Cpp") {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            if(!input) {
                compiler.compileCPP(envData, code, function(data) {
                    if(data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            } else {
                compiler.compileCPPWithInput(envData, code, input, function(data) {
                    if(data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            }
        } else if (lang === "Java") {
            var envData = { OS: "windows", cmd: "javac", options: { timeout: 10000 } };
            if (!input) {
                compiler.compileJava(envData, code, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            } else {
                compiler.compileJavaWithInput(envData, code, input, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            }
        } else if (lang === "Python") {
            var envData = { OS: "windows" };
            if (!input) {
                compiler.compilePython(envData, code, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            } else {
                compiler.compilePythonWithInput(envData, code, input, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            }
        } else {
            res.send({ output: "Invalid language" });
        }
    } catch(e) {
        console.error("Error:", e);
        res.send({ output: "error" });
    }
});



app.listen(8000)

  */
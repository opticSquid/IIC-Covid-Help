# Project Requirements

- Node.js software to be installed in local machine.

---

# GuideLines to run the project Locally

1. Create a folder in the directory where you want to Clone this project.
2. Create 2 sub-folders inside the folder that you created and name them the following:

- Server
- Website

3. After creating the folder Structure should look like this:

![Folder Structure image](https://github.com/soumalyatheking22012001/IIC-Covid-Help/blob/main/src/assets/images/Project%20Structure.png "Folder Structure image")

4. Clone this repo inside the `Website` folder.
5. Clone the server repo with this command inside the `Server` folder.

```bash
git clone "https://github.com/soumalyatheking22012001/IICCovidHelpServer.git"
```

6. Come inside the `Website` folder go to `src/contexts/InitialState.js`
7. Comment this line:

```bash
origin: "https://vast-scrubland-97353.herokuapp.com",
```

8. Uncomment this line:

```bash
 dev_origin: "http://localhost:5000",
```

9. Save Changes to the file.
10. Install all dependencies by running the below command in both `Website` & `Server` folder.

```bash
npm i
```

11. Run the project by running the following command from the `Website` folder:

```bash
npm run dev
```

---

# Steps to be followed before pushing

1. Come inside the `Website` folder go to `src/contexts/InitialState.js`
2. Uncomment this line:

```bash
origin: "https://vast-scrubland-97353.herokuapp.com",
```

3. Comment this line:

```bash
 dev_origin: "http://localhost:5000",
```

4. Create a pull request in `dev` branch.

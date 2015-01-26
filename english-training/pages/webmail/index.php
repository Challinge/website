<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta content="noindex, follow" name="Robots">
        <!-- Bootstrap -->
        <link href="../../css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="../../css/style_webmail.css" />
        <link rel="shortcut icon" href="favicon.ico" />
        <title>Webmail</title>
    </head>
    <body>
        <div id="bloc_page">
            <div id="formulaire_webmail">
                <div id="titre_webmail">webmail</div>
                <hr />
                <form role="form" method="post" action="https://iformat-institute.net:2096/login" target="_self">

                    <div class="form-group">
                        <label for="exampleInputEmail1">Adresse email :</label>
                        <input type="email" name="user" class="form-control" id="exampleInputEmail1" placeholder="Entrer votre mail">
                     </div>

                     <div class="form-group">
                        <label for="exampleInputPassword1">Mot de passe :</label>
                        <input type="password" name="pass" class="form-control" id="exampleInputPassword1" placeholder="Entrer votre mot de passe" required>
                     </div>
                     <button type="submit" data-loading-text="Loading..." class="btn btn-default">Connectez-vous</button>
                </form>
            </div>
        </div>
        <!-- Inclus tous fichiers nécessaires -->
        <script src="js/bootstrap.min.js"></script>
    </body> 
</html>

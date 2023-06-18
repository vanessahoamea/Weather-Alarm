package com.example.weatheralarm.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.weatheralarm.models.User;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Service
public class AuthenticationService
{
    private final Dotenv dotenv = Dotenv.load();

    public String hashPassword(String password) throws NoSuchAlgorithmException
    {
        MessageDigest md = MessageDigest.getInstance("md5");

        byte[] messageDigest = md.digest(password.getBytes());

        BigInteger bigInt = new BigInteger(1, messageDigest);

        return bigInt.toString(16);
    }

    public boolean verifyPassword(String input, String hashedPassword) throws NoSuchAlgorithmException
    {
        return hashPassword(input).equals(hashedPassword);
    }

    public String generateToken(User user)
    {
        Algorithm algorithm = Algorithm.HMAC256(dotenv.get("SECRET_KEY").getBytes());
        return JWT.create()
                .withSubject(user.getId())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 60 * 1000))
                .sign(algorithm);
    }

    public String verifyToken(String token)
    {
        try {
            Algorithm algorithm = Algorithm.HMAC256(dotenv.get("SECRET_KEY").getBytes());
            JWTVerifier jwtVerifier = JWT.require(algorithm).build();
            DecodedJWT decodedToken = jwtVerifier.verify(token);

            return decodedToken.getSubject();
        }
        catch(Exception e) {
            //
        }

        return null;
    }
}

package christophe.tiet.epicture1;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;

import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.webkit.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

/**
 * Created by Christophe Tiet
 */
public class Operability {

    public static Request request;
    public static WebView mLoginWebView;
    public static URL loginURL;
    public static String newUrl;
    public static String _Query;
    public static String[] _Query_List;
    public static String[] to_Hash;
    public static Map<String, String> tokens;


    public static Map<String, String> getTokens() { return tokens; }

    public static Request getAccount() {

        Request request = new Request.Builder()
                .url("https://api.imgur.com/3/account/Meznev31")
                .method("GET", null)
                .addHeader("Authorization", "Client-ID d116b132e74a712")
                .build();

        return request;
    }


    public static Request getImages() {

        Request request = new Request.Builder()
                .url("https://api.imgur.com/3/account/me/images")
                .method("GET", null)
                .addHeader("Authorization", "Bearer " + HomeActivity.getToken("access_token"))
                .build();
        return request;
    }

    public static Request getGalleryImages() {

        Request request = new Request.Builder()
                .url("https://api.imgur.com/3/account/Meznev31/settings")
                .method("GET", null)
                .addHeader("Authorization", "Bearer " + HomeActivity.getToken("access_token"))
                .build();
        return request;
    }

    public static  Request postImage(String binary) {
        RequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)
                .addFormDataPart("image", binary)
                .addFormDataPart("type" , "base64")
                .build();
        Request request = new Request.Builder()
                .url("https://api.imgur.com/3/upload")
                .method("POST", body)
                //.addHeader("Authorization", "Client-ID d116b132e74a712")
                .addHeader("Authorization", "Bearer " + HomeActivity.getToken("access_token"))
                .build();

        return request;
    }
    public static void _QueryList(String query) {
        String url_final = query.replace("#", "?");
        url_final = url_final.replace("bearer", "Bearer");
        try {
            loginURL = new URL(url_final);
        } catch(MalformedURLException e) {
            e.printStackTrace();
        }
        newUrl = loginURL.getQuery();
        _Query_List = newUrl.split("&");
        if (_Query_List.length > 1) {

            Log.v("tokens ", "Taille _Query_List : " + String.valueOf(_Query_List.length));
            Log.v("tokens ", "_Query_List : " + _Query_List[0]);
            Log.v("tokens ", "_Query_List : " + _Query_List[1]);
            Log.v("tokens ", "_Query_List : " + _Query_List[2]);
            Log.v("tokens ", "_Query_List : " + _Query_List[3]);
            Log.v("tokens ", "_Query_List : " + _Query_List[4]);
            Log.v("tokens ", "_Query_List : " + _Query_List[5]);
            tokens = new HashMap<>();
            for (int i = 0; i < _Query_List.length; i++) {
                to_Hash = null;
                to_Hash = _Query_List[i].split("=");
                Log.v("tokens ", to_Hash[0]);
                Log.v("tokens ", to_Hash[1]);
                tokens.put(to_Hash[0], to_Hash[1]);
            }
        }
        for (Map.Entry<String,String> entry : tokens.entrySet()) {
            Log.v("tokens ", "Key = " + entry.getKey() +
                    ", Value = " + entry.getValue());
        }
        Log.v("tokens ", tokens.get("access_token"));

    }

    public static Request getAccessToken() {


        MediaType mediaType = MediaType.parse("text/plain");
        RequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)
                .addFormDataPart("refresh_token", "1b4565f1db09d8b046286e5f731028297291ae92")
                .addFormDataPart("client_id", "7f3e38d735e7fbb")
                .addFormDataPart("client_secret", "52dd92791da04890a3e3e6fa421eef4a64d63d08")
                .addFormDataPart("grant_type", "refresh_token")
                .build();
        Request request = new Request.Builder()
                .url("https://api.imgur.com/oauth2/token")
                .method("POST", body)
                .build();

        return request;

    }

    public static Request Spliter(String _type, String binary) {

        Log.v("Toya" , "Spliter");
        if (_type == "access_token")
            return getAccessToken();
        if (_type == "getAccount")
            return getAccount();
        if (_type == "getImages")
            return getImages();
        if (_type == "getGalleryImages")
            return getGalleryImages();
        if (_type == "postImages")
            return postImage(binary);
        if (_type == "getfavImages")
            return getfavImages();


        return request;
    }

    public static Request getfavImages() {

        Request request = new Request.Builder()
                .url("https://api.imgur.com/3/account/" + HomeActivity.getToken("account_username") + "/favorites/")
                .method("GET", null)
                .addHeader("Authorization", "Bearer " + HomeActivity.getToken("access_token"))
                .build();
        return request;
    }

    public static String[] _API(Request request, String _requestType) {
        Log.v("Toya" , "_API");
        String[] return_json = {};
        try {
            OkHttpClient client = new OkHttpClient().newBuilder()
                    .build();
            CallbackFuture future = new CallbackFuture();
            client.newCall(request).enqueue(future);
            try {
                Response response = future.get();
                Log.v("TEST1" , response.toString());
               return printJson(response, _requestType);
            } catch(ExecutionException e) {
                e.printStackTrace();
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return return_json;
    }

    public static String[] printJson(Response response, String _requestType) {
        String[] return_json = {};
        try
        {
            String json = response.body().string();
            JSONObject jsonObject = new JSONObject(json);
            JSONArray jsonData = (JSONArray) jsonObject.getJSONArray("data");
            if (_requestType == "getImages" || _requestType == "getfavImages") {
                return_json = parseImagesUrlJson(jsonData);
                return return_json;
            }
            String responseString = jsonData.toString();
            Log.v("TEST33", jsonData.toString()); //RETURNS JSON :D
            Log.v("TEST1", responseString); //RETURNS JSON :D
        } catch (IOException | JSONException e) {
            e.printStackTrace();
        }

        return return_json;
    }

    public static String[] parseImagesUrlJson(JSONArray jsonData) {
        int length_json = jsonData.length();
        String[] _tmpUrlImages = new String[length_json];
        String link;
        try {
            for (int i = 0; i < length_json; i++) {
                JSONObject jObj = jsonData.getJSONObject(i);
                link = jObj.getString("link");
                _tmpUrlImages[i] = link;
            }
        } catch(JSONException e) {
            e.printStackTrace();
        }
        return _tmpUrlImages;
    }
}

class CallbackFuture extends CompletableFuture<Response> implements Callback {
    public void onResponse(Call call, Response response) {
        super.complete(response);
    }
    public void onFailure(Call call, IOException e){
        super.completeExceptionally(e);
    }
}

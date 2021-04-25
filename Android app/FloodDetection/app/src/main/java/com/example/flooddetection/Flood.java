package com.example.flooddetection;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

public class Flood {
    public String location;
    public String date;
    public double latitude;
    public double longitude;
    public boolean status;
    public int time;
    public int severity;

    public Flood(String location, String date, int time, int severity) {
        this.location = location;
        this.date = date;
        this.time = time;
        this.severity = severity;
    }

    public Flood(String location, String date, double latitude, double longitude, boolean status, int time, int severity) {
        this.location = location;
        this.date = date;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.time = time;
        this.severity = severity;
    }

    public Flood(String location, String date, double latitude, double longitude, int time, int severity) {
        this.location = location;
        this.date = date;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = false;
        this.time = time;
        this.severity = severity;
    }

    public String convertTime() {
        String timeStr = this.time + "";
        if (timeStr.length() == 4) {
            return timeStr.substring(0,2) + ":" + timeStr.substring(2);
        }
        if (timeStr.length() == 3) {
            return "0" + timeStr.substring(0,1) + ":" + timeStr.substring(1);
        }
        if (timeStr.length() == 2) {
            return "00:" + timeStr;
        }
        else {
            return "00:0" + timeStr;
        }
    }

    public String convertDate() {
        String[] arr = date.split("/");
        String output = "";
        for (int i = 0; i < arr.length; i++) {
            if (arr[i].length() != 2) {
                arr[i] = "0" + arr[i];
            }
            if (i != arr.length - 1)
                output += arr[i] + "/";
            else
                output += arr[i];
        }
        return output;
    }

    @Override
    public String toString() {
        return location + ": " + convertDate() + " " + convertTime();
    }

}

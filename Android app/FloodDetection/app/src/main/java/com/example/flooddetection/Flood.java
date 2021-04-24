package com.example.flooddetection;

public class Flood{
    public String location;
    public String date;
    public double latitude;
    public double longitude;
    public boolean status;
    public int time;
    public int severity;


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

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        //String output = location + "\t" + date + " " + convertTime();
        String output = String.format("%-15s", location);
        return output + date + " " + time;
    }

}

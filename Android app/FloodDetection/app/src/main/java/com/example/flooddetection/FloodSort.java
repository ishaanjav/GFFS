package com.example.flooddetection;

import java.util.Comparator;

public class FloodSort implements Comparator<Flood> {
    public int compare(Flood a, Flood b) {
        if (a.date.compareTo(b.date) < 0)
            return 1;
        if (a.date.compareTo(b.date) > 0)
            return -1;
        if (a.time - b.time > 0)
            return 1;
        if (a.time - b.time  < 0)
            return -1;
        return 0;
    }

}

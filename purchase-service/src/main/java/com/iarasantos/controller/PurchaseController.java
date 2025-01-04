package com.iarasantos.controller;

import com.iarasantos.model.Purchase;
import com.iarasantos.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchase")//pre-path
public class PurchaseController {
    @Autowired
    private PurchaseService service;

    @PostMapping
    public ResponseEntity<?> savePurchase(@RequestBody Purchase purchase) {
        return new ResponseEntity<>(service.savePurchase(purchase), HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllPurchasesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.findAllPurchaseByUser(userId));
    }
}

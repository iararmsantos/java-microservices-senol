package com.iarasantos.controller;

import com.iarasantos.request.PurchaseServiceRequest;
import com.iarasantos.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("gateway/purchase")
public class PurchaseController {
    @Autowired
    private PurchaseServiceRequest purchaseServiceRequest;

    @PostMapping
    public ResponseEntity<?> savePurchase(@RequestBody Object purchase) {
        return new ResponseEntity<>(purchaseServiceRequest.savePurchase(purchase), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllPurchasesByUser(@AuthenticationPrincipal UserPrincipal userPincipal) {
        return ResponseEntity.ok(purchaseServiceRequest.getAllPurchasesByUser(userPincipal.getId()));
    }
}

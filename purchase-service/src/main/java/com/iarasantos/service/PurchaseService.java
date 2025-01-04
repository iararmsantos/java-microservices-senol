package com.iarasantos.service;

import com.iarasantos.model.Purchase;

import java.util.List;

public interface PurchaseService {
    Purchase savePurchase(Purchase purchase);

    List<Purchase> findAllPurchaseByUser(Long userId);
}

package com.iarasantos.service;

import com.iarasantos.model.Purchase;
import com.iarasantos.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PurchaseServiceImpl implements PurchaseService {
    @Autowired
    private PurchaseRepository repository;

    @Override
    public Purchase savePurchase(Purchase purchase) {
        purchase.setPurchaseTime(LocalDateTime.now());

        return repository.save(purchase);
    }

    @Override
    public List<Purchase> findAllPurchaseByUser(Long userId) {
        return repository.findAllByUserId(userId);
    }
}

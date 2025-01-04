package com.iarasantos.request;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(value = "purchase-service",
path = "/api/purchase",
//url = "${purchase.service.url}",
configuration = FeignConfiguration.class)
public interface PurchaseServiceRequest {
    @PostMapping
    Object savePurchase(@RequestBody Object requestBody);

    @GetMapping("/{userId}")
    List<Object> getAllPurchasesByUser(@PathVariable("userId") Long userId);
}
